import { promises as fs } from "fs";
import path from "path";

async function readEmails(): Promise<string[]> {
    const filePath = path.join(process.cwd(), "data", "emails.json");
    try {
        const raw = await fs.readFile(filePath, "utf8");
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export default async function AdminPage({ searchParams }: { searchParams: { key?: string } }) {
    const key = searchParams?.key ?? "";
    if (key !== (process.env.ADMIN_KEY ?? "dev")) {
        return (
            <div className="p-8">
                <p>Unauthorized. Append ?key=YOUR_KEY to the URL.</p>
            </div>
        );
    }
    const emails = await readEmails();
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-4">Waitlist Emails ({emails.length})</h1>
            <div className="rounded-lg border bg-white">
                {emails.length === 0 ? (
                    <p className="p-4 text-sm text-gray-600">No emails yet.</p>
                ) : (
                    <ul className="divide-y">
                        {emails.map((e) => (
                            <li key={e} className="p-3 text-sm">{e}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}


