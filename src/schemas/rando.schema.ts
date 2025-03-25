import { z } from "zod";

export const randoSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(12, "Le nom ne doit pas dépasser 12 caractères"),
  km: z.coerce.number().min(1, "La distance doit être supérieure à 0"),
  type: z.enum(["rando", "trail", "marche"]),
});

export type Rando = z.infer<typeof randoSchema>;
