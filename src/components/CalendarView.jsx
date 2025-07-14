import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth
} from 'date-fns';

const CalendarView = ({ onNavigate, cycleData }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const getObservationForDate = (date) => {
    return cycleData.find(entry => 
      isSameDay(new Date(entry.date), date)
    );
  };

  const getDayClassName = (date, observation) => {
    let baseClass = "w-full h-12 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ";
    
    if (!isSameMonth(date, currentMonth)) {
      baseClass += "text-muted-foreground/50 ";
    }

    if (isSameDay(date, new Date())) {
      baseClass += "ring-2 ring-primary ring-offset-2 ";
    }

    if (observation) {
      switch (observation.type) {
        case 'menstruation':
          baseClass += "menstruation-day ";
          break;
        case 'clear':
          if (observation.isPeakDay) {
            baseClass += "peak-day ";
          } else {
            baseClass += "fertile-day ";
          }
          break;
        case 'creamy':
        case 'sticky':
          baseClass += "bg-yellow-100 text-yellow-800 ";
          break;
        case 'dry':
          baseClass += "infertile-day ";
          break;
        case 'spotting':
          baseClass += "bg-orange-100 text-orange-800 ";
          break;
        default:
          baseClass += "hover:bg-secondary/20 ";
      }
    } else {
      baseClass += "hover:bg-secondary/20 ";
    }

    return baseClass;
  };

  const getObservationSymbol = (observation) => {
    if (!observation) return '';
    
    const symbols = {
      dry: '○',
      sticky: '◐',
      creamy: '◑',
      clear: '●',
      menstruation: '■',
      spotting: '▪'
    };
    
    return symbols[observation.type] || '';
  };

  const getCycleStats = () => {
    const menstruationDays = cycleData.filter(entry => entry.type === 'menstruation');
    const peakDays = cycleData.filter(entry => entry.isPeakDay);
    const fertileDays = cycleData.filter(entry => 
      ['clear', 'creamy', 'sticky'].includes(entry.type)
    );

    return {
      totalObservations: cycleData.length,
      menstruationDays: menstruationDays.length,
      peakDays: peakDays.length,
      fertileDays: fertileDays.length
    };
  };

  const stats = getCycleStats();

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onNavigate('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Calendar View</h1>
          <p className="text-muted-foreground">Your fertility cycle overview</p>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="observation-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="space-y-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(date => {
                const observation = getObservationForDate(date);
                return (
                  <div
                    key={date.toISOString()}
                    className={getDayClassName(date, observation)}
                  >
                    <div className="text-center">
                      <div>{format(date, 'd')}</div>
                      {observation && (
                        <div className="text-xs mt-1">
                          {getObservationSymbol(observation)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="observation-card">
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded menstruation-day"></div>
              <span className="text-sm">Menstruation ■</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded peak-day"></div>
              <span className="text-sm">Peak Day ●</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded fertile-day"></div>
              <span className="text-sm">Clear/Stretchy ●</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
              <span className="text-sm">Creamy/Sticky ◑</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded infertile-day"></div>
              <span className="text-sm">Dry ○</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300"></div>
              <span className="text-sm">Spotting ▪</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Statistics */}
      <Card className="cycle-chart">
        <CardHeader>
          <CardTitle>Monthly Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{stats.totalObservations}</p>
              <p className="text-sm text-muted-foreground">Total Days Tracked</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{stats.menstruationDays}</p>
              <p className="text-sm text-muted-foreground">Menstrual Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{stats.fertileDays}</p>
              <p className="text-sm text-muted-foreground">Fertile Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{stats.peakDays}</p>
              <p className="text-sm text-muted-foreground">Peak Days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button 
          onClick={() => onNavigate('entry')}
          className="flex-1"
        >
          Add Today's Observation
        </Button>
        <Button 
          variant="outline"
          onClick={() => onNavigate('charts')}
          className="flex-1"
        >
          View Charts
        </Button>
      </div>
    </div>
  );
};

export default CalendarView;

