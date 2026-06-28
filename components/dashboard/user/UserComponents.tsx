import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Count-up animation hook
export function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    animate();
                }
            },
            { threshold: 0.3 }
        );

        if (startOnView) observer.observe(el);
        else animate();

        return () => observer.disconnect();

        function animate() {
            const startTime = Date.now();
            const tick = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * end));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [end, duration, startOnView]);

    return { count, ref };
}

// Animated progress bar
export function AnimatedProgressBar({ value, color = "bg-primary" }: { value: number; color?: string }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setWidth(value), 200);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                style={{ width: `${width}%` }}
            />
        </div>
    );
}

// Stat card component with hover effects
export function StatCard({
    icon,
    iconBg,
    iconColor,
    label,
    value,
    trend,
    trendLabel,
    progress,
    progressColor,
    isLoading
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    label: string;
    value: number | string;
    trend?: number;
    trendLabel?: string;
    progress?: number;
    progressColor?: string;
    isLoading?: boolean;
}) {
    const { count, ref } = useCountUp(typeof value === 'number' ? value : parseInt(value as string) || 0, 2000);

    if (isLoading) {
        return (
            <div className="relative group">
                <div className="relative rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] p-5 overflow-hidden">
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 w-10 bg-white/5 rounded-lg" />
                        <div className="h-3 bg-white/5 rounded w-20" />
                        <div className="h-7 bg-white/5 rounded w-12" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group h-full">
            {/* Hover glow */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] p-5 hover:border-white/10 transition-all duration-300 group-hover:translate-y-[-2px] h-full flex flex-col">
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
                        <div className={iconColor}>{icon}</div>
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            <TrendingUp size={10} className={trend < 0 ? 'rotate-180' : ''} />
                            {trend > 0 ? '+' : ''}{trend}
                        </div>
                    )}
                    {progress !== undefined && (
                        <span className="text-xs font-semibold text-white/70">{progress}%</span>
                    )}
                </div>

                {/* Value */}
                <div className="space-y-1 flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                    <div className="flex items-baseline gap-1.5">
                        <span
                            ref={ref}
                            className="text-2xl md:text-3xl font-bold text-white tabular-nums"
                        >
                            {count}
                        </span>
                        {trendLabel && (
                            <span className="text-xs text-gray-500">{trendLabel}</span>
                        )}
                    </div>
                </div>

                {/* Progress bar - bottom accent */}
                {progress !== undefined && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                        <AnimatedProgressBar value={progress} color={progressColor || "bg-primary"} />
                    </div>
                )}
            </div>
        </div>
    );
}

// New: Application status badge
export function StatusBadge({ status, getStatusBadgeColor, getStatusIcon }: { status: string; getStatusBadgeColor: (s: string) => string; getStatusIcon: (s: string) => React.ReactNode }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadgeColor(status)}`}>
            {getStatusIcon(status)}
            {status}
        </span>
    );
}

export function LoadingSkeleton() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Welcome skeleton */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-linear-to-br from-primary/5 via-[#0f0f0f] to-[#0a0a0a] p-6 md:p-8">
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="animate-pulse space-y-3">
                    <div className="h-7 bg-white/5 rounded-lg w-64" />
                    <div className="h-4 bg-white/5 rounded-lg w-96" />
                </div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] p-5">
                        <div className="animate-pulse space-y-4">
                            <div className="h-10 w-10 bg-white/5 rounded-lg" />
                            <div className="h-3 bg-white/5 rounded w-20" />
                            <div className="h-7 bg-white/5 rounded w-12" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] p-5">
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-white/5 rounded w-36" />
                        <div className="h-14 bg-white/5 rounded-lg" />
                        <div className="h-14 bg-white/5 rounded-lg" />
                        <div className="h-14 bg-white/5 rounded-lg" />
                    </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] p-5">
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-white/5 rounded w-28" />
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function UserSavedJobsSkeleton() {
    return (
        <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[#121211] border-white/5 p-5">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
}