import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useShorten from "@/hooks/use-shorten";
import { Zap } from "lucide-react";

export default function ShortenerForm({
  onAddUrl,
  onError,
  onSuccess,
}: {
  onAddUrl?: (originalUrl: string, newUrl: string, newTitle: string) => void;
  onError?: (title: string, message: string) => void;
  onSuccess?: (title: string, message: string) => void;
}) {
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  const { shortUrl } = useShorten();

  const handleAddUrl = async () => {
    setIsLoading(true);

    const { data, ok } = await shortUrl(newUrl, newTitle);
    if (!ok) {
      console.log("toast");
      if (onError) onError("An error has occurred", "Please try again.");
      setIsLoading(false);
      return;
    }

    if (onAddUrl) onAddUrl(newUrl, data, newTitle);
    setNewUrl("");
    setNewTitle("");
    setIsLoading(false);

    if (onSuccess) onSuccess("URL shortened correctly", "");
  };

  return (
    <>
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Shorten Your URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-gray-200 font-medium">
              Enter URL
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://your-long-url.com/very/long/path"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddUrl()}
              className="bg-white/5 border-white/20 focus:border-blue-500 focus:ring-blue-500/20 text-white placeholder-gray-400 transition-all duration-300 focus:bg-white/10 h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-200 font-medium">
              Custom Title (Optional)
            </Label>
            <Input
              id="title"
              placeholder="My awesome project"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddUrl()}
              className="bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300 focus:bg-white/10 h-12"
            />
          </div>
          <Button
            onClick={handleAddUrl}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed h-14"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5" />
                Shorten URL
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
