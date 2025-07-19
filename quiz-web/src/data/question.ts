'use client';
import { DataModel, DataSource, DataSourceCache } from '@toolpad/core/Crud';
import { z } from 'zod';

export interface Question extends DataModel {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  correctOption: "option1" | "option2" | "option3";
  category: string;
  difficultyLevel: 'easy' | 'medium' | 'hard';
}

const API_BASE = 'http://localhost:8080/question'; // update if hosted elsewhere

export const questionDataSource: DataSource<Question> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'questionText', headerName: 'Question Text', width: 200 },
    { field: 'option1', headerName: 'Option 1', width: 150 },
    { field: 'option2', headerName: 'Option 2', width: 150 },
    { field: 'option3', headerName: 'Option 3', width: 150 },
    { field: 'correctOption', headerName: 'Correct Option', width: 150 },
    { field: 'category', headerName: 'Category', width: 120 },
    { field: 'difficultyLevel', headerName: 'Difficulty Level', width: 120 },
  ],

  async getMany() {
    const res = await fetch(`${API_BASE}`);
    const items = await res.json();
    return {
      items,
      itemCount: items.length,
    };
  },

  async getOne(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error('Question not found');
    return await res.json();
  },

  async createOne(data) {
    const res = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create question');
    return await res.json();
  },

  async updateOne(id, data) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update question');
    return await res.json();
  },

  async deleteOne(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    console.log('Delete response:', res);
    if (!res.ok) throw new Error('Failed to delete question');
  },

  validate: z.object({
    questionText: z.string().min(1, 'Required'),
    option1: z.string().min(1, 'Required'),
    option2: z.string().min(1, 'Required'),
    option3: z.string().min(1, 'Required'),
    correctOption: z.enum(['option1', 'option2', 'option3']),
    category: z.string().min(1, 'Required'),
    difficultyLevel: z.enum(['easy', 'medium', 'hard']),
  })['~standard'].validate,
};

export const questionCache = new DataSourceCache();
