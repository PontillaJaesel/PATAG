import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Check, X, AlertTriangle, FileText, Activity, Eye } from "lucide-react";

export const Route = createFileRoute("/admin")({
    head: () => ({ meta: [{ title: "Admin Simulation — P.A.T.A.G." }] }),
    component: AdminSimulation,
});

// 1. Added dummy image URLs (using a placeholder service to generate fake ID cards)
const DUMMY_REQUESTS = [
    { id: 1, user: "Juan Dela Cruz", type: "Voter ID", date: "May 21, 2026", imageUrl: "https://placehold.co/600x400/2a2a2a/e8a365?text=Voter+ID\nJuan+Dela+Cruz" },
    { id: 2, user: "Maria Santos", type: "Press Badge", date: "May 20, 2026", imageUrl: "https://placehold.co/600x400/2a2a2a/e8a365?text=Press+Badge\nMaria+Santos" },
    { id: 3, user: "Dr. Jose Rizal", type: "School ID", date: "May 19, 2026", imageUrl: "https://placehold.co/600x400/2a2a2a/e8a365?text=University+ID\nDr.+Jose+Rizal" },
];

function AdminSimulation() {
    const [requests, setRequests] = useState(DUMMY_REQUESTS);
    const [logs, setLogs] = useState<string[]>([]);

    // 2. State to track which image is currently being viewed
    const [viewingId, setViewingId] = useState<string | null>(null);

    const handleAction = (id: number, action: "Approved" | "Rejected", userName: string) => {
        setRequests((prev) => prev.filter((req) => req.id !== id));
        setViewingId(null); // Close the image popup if they approve/reject while looking at it

        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [`[${timestamp}] SIMULATED: ${action} request for ${userName}`, ...prev]);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] p-8 font-sans text-cream">

            {/* Header */}
            <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                    <h1 className="flex items-center gap-3 font-display text-3xl text-copper">
                        <Shield className="h-8 w-8" />
                        PATAG Admin Dashboard
                    </h1>
                    <p className="mt-2 flex items-center gap-2 text-sm text-yellow-500/90">
                        <AlertTriangle className="h-4 w-4" />
                        Simulation Mode: Actions are local only and will not be stored in the database.
                    </p>
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-3">

                {/* Main Content: Pending Requests */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
                        <FileText className="h-5 w-5 text-copper" />
                        Pending Verification Requests
                    </h2>

                    {requests.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-cream/60">
                            No pending requests. All caught up!
                        </div>
                    ) : (
                        requests.map((req) => (
                            <div key={req.id} className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-xl border border-white/10 bg-onyx/40 p-5 transition hover:bg-onyx/60">
                                <div>
                                    <h3 className="font-medium text-lg">{req.user}</h3>
                                    <div className="mt-1 flex items-center gap-3 text-sm text-cream/60">
                                        <span className="rounded bg-copper/20 px-2 py-0.5 text-copper text-xs font-semibold uppercase tracking-wider">
                                            {req.type}
                                        </span>
                                        <span>Submitted: {req.date}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {/* New View ID Button */}
                                    <button
                                        onClick={() => setViewingId(req.imageUrl)}
                                        className="flex items-center gap-1 rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/30"
                                    >
                                        <Eye className="h-4 w-4" /> View ID
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, "Approved", req.user)}
                                        className="flex items-center gap-1 rounded-lg bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400 transition hover:bg-green-500/30"
                                    >
                                        <Check className="h-4 w-4" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(req.id, "Rejected", req.user)}
                                        className="flex items-center gap-1 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/30"
                                    >
                                        <X className="h-4 w-4" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sidebar: Simulation Logs */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/10 pb-2">
                        <Activity className="h-5 w-5 text-copper" />
                        System Activity Log
                    </h2>

                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 h-[400px] overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-sm text-cream/40 italic text-center mt-10">
                                No actions taken yet.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {logs.map((log, index) => (
                                    <div key={index} className="text-sm border-l-2 border-copper pl-3 py-1 bg-white/5 rounded-r">
                                        <span className="text-cream/70 font-mono text-xs block mb-1">System Notice</span>
                                        {log}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. The Image Viewer Modal popup */}
            {viewingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="relative max-w-3xl w-full rounded-2xl bg-onyx p-2 ring-1 ring-white/20 shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setViewingId(null)}
                            className="absolute -top-4 -right-4 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 shadow-lg"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <img
                            src={viewingId}
                            alt="User ID Document"
                            className="w-full h-auto max-h-[80vh] rounded-xl object-contain bg-black/50"
                        />
                    </div>
                </div>
            )}

        </div>
    );
}