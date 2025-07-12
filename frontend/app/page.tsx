"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  LinkIcon,
  BarChart3,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Users,
  Clock,
  Check,
} from "lucide-react";
import FloatingParticles from "@/components/floating-particles";
import ShortenerForm from "@/components/shortener-form";
import { ShortenedUrl } from "@/types/shortened-url";

export default function UrlShortener() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [editingUrl, setEditingUrl] = useState<ShortenedUrl | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editOriginalUrl, setEditOriginalUrl] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Cargar URLs del localStorage al iniciar
  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls");
    if (savedUrls) {
      const parsedUrls = JSON.parse(savedUrls).map((url: any) => ({
        ...url,
        createdAt: new Date(url.createdAt),
      }));
      setUrls(parsedUrls);
    }
  }, []);

  // Guardar URLs en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("shortenedUrls", JSON.stringify(urls));
  }, [urls]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleDeleteUrl = (id: string) => {
    setUrls((prev) => prev.filter((url) => url.id !== id));
    toast({
      title: "URL Deleted",
      description: "The link has been removed",
    });
  };

  const handleEditUrl = (url: ShortenedUrl) => {
    setEditingUrl(url);
    setEditTitle(url.title || "");
    setEditOriginalUrl(url.originalUrl);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingUrl) return;

    if (!isValidUrl(editOriginalUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setUrls((prev) =>
      prev.map((url) =>
        url.id === editingUrl.id
          ? {
              ...url,
              originalUrl: editOriginalUrl,
              title: editTitle.trim() || undefined,
            }
          : url
      )
    );

    setIsEditDialogOpen(false);
    setEditingUrl(null);
    setEditTitle("");
    setEditOriginalUrl("");

    toast({
      title: "URL Updated",
      description: "Changes saved successfully",
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied to Clipboard",
        description: "Link copied successfully",
      });
    } catch {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleUrlClick = (url: ShortenedUrl) => {
    setUrls((prev) =>
      prev.map((u) => (u.id === url.id ? { ...u, clicks: u.clicks + 1 } : u))
    );
    window.open(url.originalUrl, "_blank");
  };

  const getShortUrl = (shortCode: string) => {
    return `${shortCode}`;
  };

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated floating particles */}
      <FloatingParticles />

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <LinkIcon className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ShortLink
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transform your long URLs into powerful, trackable short links with
              advanced analytics and seamless sharing.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Instant URL shortening with optimized performance",
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Enterprise-grade security for your links",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Detailed insights and click tracking",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-500/30"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* URL Shortener Form */}
            <div className="lg:col-span-2">
              <ShortenerForm
                onAddUrl={(originalUrl, shortedUrl, newTitle) =>
                  setUrls((prev) => [
                    {
                      id: Date.now().toString(),
                      originalUrl,
                      shortCode: shortedUrl,
                      title: newTitle.trim() || undefined,
                      createdAt: new Date(),
                      clicks: 0,
                    },
                    ...prev,
                  ])
                }
              />

              {/* URLs List */}
              <Card className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Your Shortened URLs ({urls.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {urls.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <LinkIcon className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No URLs yet</h3>
                      <p className="text-sm text-gray-500">
                        Create your first shortened URL above
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {urls.map((url, index) => (
                        <div
                          key={url.id}
                          className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "slideInUp 0.6s ease-out forwards",
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              {url.title && (
                                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                  {url.title}
                                </h3>
                              )}

                              {/* Short URL */}
                              <div className="flex items-center gap-3 mb-2">
                                <button
                                  onClick={() => handleUrlClick(url)}
                                  className="text-blue-400 hover:text-blue-300 font-mono text-sm bg-blue-500/10 px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-blue-500/20"
                                >
                                  {getShortUrl(url.shortCode)}
                                  <ExternalLink className="h-3 w-3" />
                                </button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(
                                      `https://${getShortUrl(url.shortCode)}`,
                                      url.id
                                    )
                                  }
                                  className="hover:bg-white/10 transition-all duration-300"
                                >
                                  {copiedId === url.id ? (
                                    <Check className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>

                              {/* Original URL */}
                              <p className="text-gray-400 text-sm truncate mb-2">
                                {url.originalUrl}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  {url.clicks} clicks
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {url.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <Dialog
                                open={isEditDialogOpen}
                                onOpenChange={setIsEditDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditUrl(url)}
                                    className="hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-black/90 backdrop-blur-xl border border-white/20">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">
                                      Edit URL
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label
                                        htmlFor="edit-title"
                                        className="text-gray-200"
                                      >
                                        Title
                                      </Label>
                                      <Input
                                        id="edit-title"
                                        value={editTitle}
                                        onChange={(e) =>
                                          setEditTitle(e.target.value)
                                        }
                                        placeholder="Optional title"
                                        className="bg-white/5 border-white/20 focus:border-purple-500 text-white"
                                      />
                                    </div>
                                    <div>
                                      <Label
                                        htmlFor="edit-url"
                                        className="text-gray-200"
                                      >
                                        Original URL
                                      </Label>
                                      <Input
                                        id="edit-url"
                                        value={editOriginalUrl}
                                        onChange={(e) =>
                                          setEditOriginalUrl(e.target.value)
                                        }
                                        placeholder="https://example.com"
                                        className="bg-white/5 border-white/20 focus:border-blue-500 text-white"
                                      />
                                    </div>
                                    <div className="flex gap-3">
                                      <Button
                                        onClick={handleSaveEdit}
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                      >
                                        Save Changes
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          setIsEditDialogOpen(false)
                                        }
                                        className="flex-1 border-white/20 text-gray-300 hover:bg-white/10"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteUrl(url.id)}
                                className="hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Analytics Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">
                        {urls.length}
                      </div>
                      <div className="text-xs text-gray-400">Total Links</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">
                        {totalClicks}
                      </div>
                      <div className="text-xs text-gray-400">Total Clicks</div>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-pink-400">
                      {urls.length > 0
                        ? Math.round((totalClicks / urls.length) * 10) / 10
                        : 0}
                    </div>
                    <div className="text-xs text-gray-400">
                      Avg. Clicks per Link
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {urls.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">
                      No activity yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {urls.slice(0, 3).map((url) => (
                        <div
                          key={url.id}
                          className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">
                              {url.title || url.originalUrl}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {url.clicks} clicks
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Toaster />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
