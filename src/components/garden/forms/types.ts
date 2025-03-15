
import { z } from 'zod';
import { mentalModelSchema } from './schema';

export type MentalModelFormValues = z.infer<typeof mentalModelSchema>;
