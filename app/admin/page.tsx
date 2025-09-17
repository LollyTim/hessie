import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
    const { key = "" } = await searchParams;
    if (key !== (process.env.ADMIN_KEY ?? "dev")) {
        return (
            <div className="p-8">
                <p>Unauthorized. Append ?key=YOUR_KEY to the URL.</p>
            </div>
        );
    }
    const url = process.env.NEXT_PUBLIC_CONVEX_URL as string;
    const client = new ConvexHttpClient(url);
    const emails = await client.query(api.emails.list, {});
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-4">Waitlist Emails ({emails.length})</h1>
            <div className="rounded-lg border bg-white">
                {emails.length === 0 ? (
                    <p className="p-4 text-sm text-gray-600">No emails yet.</p>
                ) : (
                    <ul className="divide-y">
                        {emails.map((e: any) => {
                            const ts = new Date(e.createdAt).toLocaleString();
                            return (
                                <li key={e.id} className="p-3 text-sm flex items-center justify-between">
                                    <span className="font-mono text-gray-900">{e.email}</span>
                                    <span className="text-gray-500">{ts}</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}


