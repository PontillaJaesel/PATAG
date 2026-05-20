// @ts-ignore - Bypassing the stubborn module resolution error
import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';
import path from 'node:path';

// This securely takes data from React and inserts it into SQLite
export const registerUser = createServerFn({ method: 'POST' })
    .inputValidator((data: any) => data) // <-- MAGIC FIX: Renamed to inputValidator
    .handler(async ({ data }: { data: any }) => {

        // 🚨 We import the database dynamically INSIDE the server function!
        const { db } = await import('./db');

        let voterIdUrl = null;

        // --- 1. HANDLE THE FILE UPLOAD ---
        if (data.idFile && data.idFile.name) {
            const file = data.idFile;

            // Create a unique filename (e.g., 1716240000000-my-id-card.jpg)
            const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const uniqueFilename = `${Date.now()}-${safeName}`;

            // Define where to save it: C:\patag\PATAG\public\uploads\
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            // Ensure the 'uploads' folder actually exists (creates it if it doesn't)
            await fs.mkdir(uploadDir, { recursive: true });

            // Convert the browser File object into a Buffer and save it to the hard drive
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(path.join(uploadDir, uniqueFilename), buffer);

            // Create the text pointer to save in the database
            voterIdUrl = `/uploads/${uniqueFilename}`;
        }

        // --- 2. SAVE TO DATABASE ---
        try {
            const query = db.query(`
                INSERT INTO users (
                    fullName, email, password, dob, role, 
                    province, city, industry, specificWork, voterType, voterIdUrl
                )
                VALUES (
                    $fullName, $email, $password, $dob, $role, 
                    $province, $city, $industry, $specificWork, $voterType, $voterIdUrl
                )
            `);

            query.run({
                $fullName: data.fullName,
                $email: data.email,
                $password: data.password,
                $dob: data.dob,
                $role: data.role,
                $province: data.province || '', // Using the new province data
                $city: data.location || data.city || '', // Fallback to location if city is missing
                $industry: data.industry || '',
                $specificWork: data.specificWork || '',
                $voterType: data.voterType || '',
                $voterIdUrl: voterIdUrl // This will be null, or the /uploads/... link!
            });

            return { success: true };

        } catch (error: any) {
            // Log the actual error to your terminal so you can debug if it fails!
            console.error("Database Insert Error:", error);

            if (error.message.includes("UNIQUE")) {
                throw new Error("This email is already registered.");
            }
            throw new Error("Failed to create account in the database.");
        }
    });