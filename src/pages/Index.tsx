import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
}

interface HistoryItem {
  id: number;
  timestamp: string;
  action: string;
  type: 'join' | 'leave' | 'achievement' | 'warning';
}

const Index = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [history] = useState<HistoryItem[]>([
    { id: 1, timestamp: '2 min ago', action: 'Joined Server: Mega Obby Adventure', type: 'join' },
    { id: 2, timestamp: '15 min ago', action: 'Achievement Unlocked: Speed Master', type: 'achievement' },
    { id: 3, timestamp: '1 hour ago', action: 'Left Server: PvP Arena', type: 'leave' },
    { id: 4, timestamp: '2 hours ago', action: 'Suspicious Activity Detected', type: 'warning' },
    { id: 5, timestamp: '3 hours ago', action: 'Joined Server: Sword Fight Arena', type: 'join' },
    { id: 6, timestamp: '4 hours ago', action: 'Achievement Unlocked: First Victory', type: 'achievement' },
  ]);

  const stats: StatItem[] = [
    { label: 'Total Playtime', value: '342h', change: 12 },
    { label: 'Games Played', value: 89, change: 5 },
    { label: 'Friends Online', value: 14 },
    { label: 'Achievements', value: 156, change: 8 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setCameraLoading(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case 'join': return 'LogIn';
      case 'leave': return 'LogOut';
      case 'achievement': return 'Trophy';
      case 'warning': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const getHistoryColor = (type: string) => {
    switch (type) {
      case 'join': return 'text-secondary';
      case 'leave': return 'text-muted-foreground';
      case 'achievement': return 'text-yellow-500';
      case 'warning': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Radio" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Player Tracker</h1>
              <p className="text-muted-foreground">Real-time monitoring system</p>
            </div>
          </div>
          
          <Badge variant={isOnline ? "default" : "secondary"} className="text-sm px-4 py-2">
            <span className="live-indicator">{isOnline ? 'LIVE' : 'OFFLINE'}</span>
          </Badge>
        </header>



        <Tabs defaultValue="player" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="player">
              <Icon name="User" size={16} className="mr-2" />
              Player
            </TabsTrigger>
            <TabsTrigger value="camera">
              <Icon name="Video" size={16} className="mr-2" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="statistics">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="Clock" size={16} className="mr-2" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="player">
            <Card>
              <CardHeader>
                <CardTitle>Player Profile</CardTitle>
                <CardDescription>serehka111 account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-5xl font-bold">
                    S
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">serehka111</h3>
                      <p className="text-muted-foreground">Active Player</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          {stat.change && (
                            <p className={`text-xs flex items-center gap-1 ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              <Icon name={stat.change > 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                              {Math.abs(stat.change)}%
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="camera">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Video" size={20} />
                  Camera Feed
                </CardTitle>
                <CardDescription>Live surveillance system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  {cameraLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Icon name="Loader2" className="animate-spin text-muted-foreground" size={48} />
                      <p className="text-muted-foreground">Connecting to camera...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 p-8 text-center">
                      <Icon name="VideoOff" className="text-muted-foreground" size={64} />
                      <div>
                        <p className="font-medium text-foreground text-lg">Camera Unavailable</p>
                        <p className="text-sm text-muted-foreground mt-1">Signal lost or device offline</p>
                      </div>
                      <Button variant="outline" onClick={() => setCameraLoading(true)}>
                        <Icon name="RefreshCw" size={16} className="mr-2" />
                        Retry Connection
                      </Button>
                    </div>
                  )}
                  
                  {!cameraLoading && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="destructive" className="animate-pulse">
                        <Icon name="AlertCircle" size={14} className="mr-1" />
                        ERROR
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <Icon name="Shield" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-2">ENCRYPTED MESSAGE:</p>
                      <p className="font-mono text-sm mb-3">
                        796f752068617665206e6f7468696e6720746f20646f20616e6472652c206920736565<br/>
                        20616e79206f6620796f7572206d6f7665
                      </p>
                      <p className="text-lg font-medium text-foreground">ты мне досих пор не веришь андре?</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Session Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">2h 34m</p>
                  <p className="text-xs text-muted-foreground mt-1">Current session</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Games Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground mt-1">+3 from yesterday</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="default" className="text-sm">
                    <span className="live-indicator">Active Now</span>
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">Last seen: Just now</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Recent player actions and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`mt-1 ${getHistoryColor(item.type)}`}>
                        <Icon name={getHistoryIcon(item.type)} size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;