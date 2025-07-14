import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, TrendingUp, Plus, Lightbulb } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

const Dashboard = ({ onNavigate, cycleData, addObservation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaysTip, setTodaysTip] = useState('');

  const educationalTips = [
    "The Creighton Model helps you understand your body's natural fertility signs through careful observation of cervical mucus.",
    "Peak Day is the last day of clear, stretchy, or lubricative mucus - it correlates closely with ovulation.",
    "Dry days indicate infertility when no mucus discharge is observed.",
    "The post-Peak phase (after ovulation) is typically consistent in length, around 12-16 days.",
    "Sticky or cloudy mucus often appears as fertility begins to develop.",
    "The CrMS is 96.8-99.5% effective for avoiding pregnancy when used correctly.",
    "Recording observations daily helps identify your unique fertility pattern.",
    "The Base Infertile Pattern (BIP) helps women with continuous mucus identify fertile changes."
  ];

  useEffect(() => {
    const tipIndex = new Date().getDate() % educationalTips.length;
    setTodaysTip(educationalTips[tipIndex]);
  }, []);

  const getCurrentCycleDay = () => {
    const sortedCycleData = [...cycleData].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastMenstruationEntry = sortedCycleData.filter(entry => entry.type === 'menstruation').pop();

    if (!lastMenstruationEntry) return 1; // If no menstruation recorded, start from day 1
    
    const daysSinceLastMenstruation = Math.floor((currentDate - new Date(lastMenstruationEntry.date)) / (1000 * 60 * 60 * 24));
    return Math.max(1, daysSinceLastMenstruation + 1);
  };

  const getCyclePhase = () => {
    const cycleDay = getCurrentCycleDay();
    const peakDay = cycleData.find(entry => entry.isPeakDay);
    
    if (cycleDay <= 7) return 'Menstrual/Post-Menstrual';
    if (peakDay) {
      const peakDate = new Date(peakDay.date);
      const daysSincePeak = Math.floor((currentDate - peakDate) / (1000 * 60 * 60 * 24));
      if (daysSincePeak >= 0 && daysSincePeak <= 3) return 'Post-Peak (Infertile)';
      if (daysSincePeak < 0) return 'Pre-Peak (Variable)';
    }
    return 'Pre-Peak (Variable)';
  };

  const getTodaysObservation = () => {
    return cycleData.find(entry => 
      isSameDay(new Date(entry.date), currentDate)
    );
  };

  const quickAddObservation = (type) => {
    const observation = {
      date: currentDate.toISOString().split('T')[0],
      type: type,
      notes: '',
      timestamp: new Date().toISOString()
    };
    addObservation(observation);
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">CrMS Tracker</h1>
        <p className="text-muted-foreground">Creighton Model FertilityCare System</p>
      </div>

      {/* Today's Overview */}
      <Card className="observation-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today - {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cycle Day</p>
              <p className="text-2xl font-bold text-primary">{getCurrentCycleDay()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phase</p>
              <p className="text-lg font-semibold">{getCyclePhase()}</p>
            </div>
          </div>
          
          {getTodaysObservation() ? (
            <div className="p-3 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Today's Observation</p>
              <p className="font-medium capitalize">{getTodaysObservation().type}</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Quick Add Today's Observation:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => quickAddObservation('dry')}
                  className="text-xs"
                >
                  Dry
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => quickAddObservation('sticky')}
                  className="text-xs"
                >
                  Sticky
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => quickAddObservation('creamy')}
                  className="text-xs"
                >
                  Creamy
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => quickAddObservation('clear')}
                  className="text-xs"
                >
                  Clear/Stretchy
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => quickAddObservation('menstruation')}
                  className="text-xs"
                >
                  Menstruation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Educational Tip */}
      <div className="educational-tip">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Daily Tip</h3>
            <p className="text-sm">{todaysTip}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="observation-card cursor-pointer hover:bg-secondary/10" onClick={() => onNavigate('entry')}>
          <CardContent className="p-6 text-center">
            <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Add Observation</h3>
            <p className="text-sm text-muted-foreground">Record today's fertility signs</p>
          </CardContent>
        </Card>

        <Card className="observation-card cursor-pointer hover:bg-secondary/10" onClick={() => onNavigate('calendar')}>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">View Calendar</h3>
            <p className="text-sm text-muted-foreground">See your cycle overview</p>
          </CardContent>
        </Card>

        <Card className="observation-card cursor-pointer hover:bg-secondary/10" onClick={() => onNavigate('education')}>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Learn More</h3>
            <p className="text-sm text-muted-foreground">Educational resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cycle Stats */}
      <Card className="cycle-chart">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cycle Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{cycleData.length}</p>
              <p className="text-sm text-muted-foreground">Total Observations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">
                {cycleData.filter(entry => entry.type === 'clear').length}
              </p>
              <p className="text-sm text-muted-foreground">Peak-Type Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {cycleData.filter(entry => entry.type === 'menstruation').length}
              </p>
              <p className="text-sm text-muted-foreground">Menstrual Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground">
                {cycleData.filter(entry => entry.type === 'dry').length}
              </p>
              <p className="text-sm text-muted-foreground">Dry Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

