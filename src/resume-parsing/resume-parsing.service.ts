import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';

interface ParsedResume {
  text: string;
  emails: string[];
  phones: string[];
  skills: string[];
  experience: string[];
  education: string[];
  name?: string;
  location?: string;
}

@Injectable()
export class ResumeService {
  private readonly logger = new Logger(ResumeService.name);
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OpenAI API key not found. Question generation will not work.');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async parse(buffer: Buffer): Promise<ParsedResume> {
    try {
      const data = await pdfParse(buffer);
      const text = data.text;

      if (!text || text.trim().length === 0) {
        throw new Error('No text content found in the PDF');
      }

      // Enhanced regex patterns
      const emails = this.extractEmails(text);
      const phones = this.extractPhones(text);
      const skills = this.extractSkills(text);
      const experience = this.extractExperience(text);
      const education = this.extractEducation(text);
      const name = this.extractName(text);
      const location = this.extractLocation(text);

      return {
        text: text.trim(),
        emails,
        phones,
        skills,
        experience,
        education,
        name,
        location,
      };
    } catch (error) {
      this.logger.error('Error parsing resume:', error);
      throw new Error(`Failed to parse resume: ${error.message}`);
    }
  }

  private extractEmails(text: string): string[] {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return [...new Set(text.match(emailRegex) || [])];
  }

  private extractPhones(text: string): string[] {
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    return [...new Set(text.match(phoneRegex) || [])];
  }

  private extractSkills(text: string): string[] {
    const skillsSection = text.match(/(?:skills|technologies|expertise|competencies)[:\s\n]*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i);
    if (!skillsSection) return [];

    const skillsText = skillsSection[1];
    const skills = skillsText
      .split(/[,\n•\-\|]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0 && skill.length < 50);

    return [...new Set(skills)];
  }

  private extractExperience(text: string): string[] {
    const experienceSection = text.match(/(?:experience|work history|employment)[:\s\n]*([\s\S]*?)(?=\n\n[A-Z]|education|skills|$)/i);
    if (!experienceSection) return [];

    const experienceText = experienceSection[1];
    const experiences = experienceText
      .split(/\n(?=\S)/)
      .map(exp => exp.trim())
      .filter(exp => exp.length > 10);

    return experiences;
  }

  private extractEducation(text: string): string[] {
    const educationSection = text.match(/(?:education|academic|qualification)[:\s\n]*([\s\S]*?)(?=\n\n[A-Z]|experience|skills|$)/i);
    if (!educationSection) return [];

    const educationText = educationSection[1];
    const education = educationText
      .split(/\n(?=\S)/)
      .map(edu => edu.trim())
      .filter(edu => edu.length > 5);

    return education;
  }

  private extractName(text: string): string | undefined {
    const lines = text.split('\n');
    const firstLine = lines[0]?.trim();
    
    // Simple heuristic: if first line contains only letters and spaces, likely a name
    if (firstLine && /^[a-zA-Z\s]+$/.test(firstLine) && firstLine.length < 50) {
      return firstLine;
    }
    
    return undefined;
  }

  private extractLocation(text: string): string | undefined {
    const locationRegex = /([A-Za-z\s]+,\s*[A-Za-z\s]+,?\s*\d{5}?)|([A-Za-z\s]+,\s*[A-Za-z]{2})/g;
    const matches = text.match(locationRegex);
    return matches?.[0]?.trim();
  }

  async generateQuestionsFromText(text: string): Promise<string[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const prompt = `
You are an experienced technical interviewer. Based on the resume content below, generate 3-5 specific, relevant interview questions that would help assess the candidate's technical skills and experience.

Guidelines:
- Focus on technical skills and experience mentioned in the resume
- Make questions specific to the candidate's background
- Include both technical and behavioral questions
- Questions should be challenging but fair
- Format each question on a new line starting with a number

Resume Content:
"""
${text.substring(0, 2000)} // Limit text to avoid token limits
"""

Generate interview questions:`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an experienced technical interviewer who creates relevant, specific interview questions based on candidate resumes.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse questions from the response
      const questions = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          // Remove numbering if present
          return line.replace(/^\d+\.\s*/, '').trim();
        })
        .filter(question => question.length > 10);

      return questions.length > 0 ? questions : ['Unable to generate specific questions from the provided resume content.'];
    } catch (error) {
      this.logger.error('Error generating questions:', error);
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
  }
}