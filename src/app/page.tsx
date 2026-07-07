'use client';

import { useState } from 'react';
import { Download, Loader2, Database, Copy, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [schema, setSchema] = useState('{\n  "id": "uuid",\n  "name": "full name",\n  "email": "email address",\n  "amount": "random decimal between 10 and 1000"\n}');
  const [rowCount, setRowCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemaDefinition: schema, rowCount }),
      });
      const data = await res.json();
      if (data.data) {
        setResult(data.data);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Error generating data');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      <header className="px-8 py-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
        <Database className="text-blue-500 w-6 h-6" />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          MockData AI
        </h1>
      </header>

      <main className="flex-1 p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Form */}
        <section className="flex flex-col gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Data Schema</h2>
            <p className="text-sm text-slate-400 mb-4">Describe the structure and type of data you need. You can use JSON or plain english.</p>
            <textarea
              className="w-full h-64 bg-slate-950 border border-slate-700 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Rows</h2>
            <input
              type="number"
              min={1}
              max={50}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
            {loading ? 'Generating...' : 'Generate Data'}
          </button>
        </section>

        {/* Right Column: Result */}
        <section className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-lg font-semibold text-white">Result</h2>
            {result && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-slate-700 rounded-md transition-colors text-slate-300 hover:text-white"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result, null, 2))}`}
                  download="mock_data.json"
                  className="p-2 hover:bg-slate-700 rounded-md transition-colors text-slate-300 hover:text-white"
                  title="Download JSON"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
          <div className="p-6 flex-1 overflow-auto bg-slate-950">
            {result ? (
              <pre className="font-mono text-sm text-green-400">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Generated JSON data will appear here.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
