import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Info } from 'lucide-react';
import { format } from 'date-fns';

const ObservationEntry = ({ onNavigate, addObservation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [observationType, setObservationType] = useState('');
  const [notes, setNotes] = useState('');
  const [isPeakDay, setIsPeakDay] = useState(false);

  const observationTypes = [
    { 
      value: 'dry', 
      label: 'Dry', 
      description: 'No mucus discharge observed',
      color: 'bg-gray-100 text-gray-800 border-gray-300'
    },
    { 
      value: 'sticky', 
      label: 'Sticky', 
      description: 'Thick, tacky, or pasty mucus',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    { 
      value: 'creamy', 
      label: 'Creamy', 
      description: 'Smooth, lotion-like mucus',
      color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    { 
      value: 'clear', 
      label: 'Clear/Stretchy', 
      description: 'Clear, stretchy, or lubricative mucus',
      color: 'bg-green-100 text-green-800 border-green-300'
    },
    { 
      value: 'menstruation', 
      label: 'Menstruation', 
      description: 'Menstrual bleeding',
      color: 'bg-red-100 text-red-800 border-red-300'
    },
    { 
      value: 'spotting', 
      label: 'Spotting', 
      description: 'Light bleeding or brown discharge',
      color: 'bg-orange-100 text-orange-800 border-orange-300'
    }
  ];

  const handleSave = () => {
    if (!observationType) {
      alert('Please select an observation type');
      return;
    }

    const observation = {
      date: selectedDate,
      type: observationType,
      notes: notes,
      isPeakDay: isPeakDay,
      timestamp: new Date().toISOString()
    };

    addObservation(observation);
    
    // Reset form
    setObservationType('');
    setNotes('');
    setIsPeakDay(false);
    
    // Navigate back to dashboard
    onNavigate('dashboard');
  };

  const getObservationInfo = (type) => {
    const info = {
      dry: "Dry days indicate infertility. No mucus discharge is observed during routine bathroom use.",
      sticky: "Sticky mucus often appears as fertility begins. It may be thick, tacky, or pasty in consistency.",
      creamy: "Creamy mucus indicates developing fertility. It has a smooth, lotion-like consistency.",
      clear: "Clear, stretchy, or lubricative mucus indicates peak fertility. This is the most fertile type of mucus.",
      menstruation: "Menstrual bleeding marks the beginning of a new cycle.",
      spotting: "Light bleeding or brown discharge that is not full menstrual flow."
    };
    return info[type] || '';
  };

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
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
          <h1 className="text-2xl font-bold">Add Observation</h1>
          <p className="text-muted-foreground">Record your daily fertility signs</p>
        </div>
      </div>

      <Card className="observation-card">
        <CardHeader>
          <CardTitle>Daily Observation Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-input"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Observation Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Observation Type</label>
            <div className="grid grid-cols-1 gap-3">
              {observationTypes.map((type) => (
                <div
                  key={type.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    observationType === type.value
                      ? `${type.color} border-current`
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setObservationType(type.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      observationType === type.value 
                        ? 'bg-primary border-primary' 
                        : 'border-border'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Day Checkbox */}
          {(observationType === 'clear' || observationType === 'creamy') && (
            <div className="flex items-center space-x-2 p-4 bg-primary/10 rounded-lg">
              <input
                type="checkbox"
                id="peakDay"
                checked={isPeakDay}
                onChange={(e) => setIsPeakDay(e.target.checked)}
                className="w-4 h-4 text-primary"
              />
              <label htmlFor="peakDay" className="text-sm font-medium">
                Mark as Peak Day
              </label>
              <Info className="h-4 w-4 text-primary" />
            </div>
          )}

          {/* Information Box */}
          {observationType && (
            <div className="educational-tip">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">About This Observation</h3>
                  <p className="text-sm">{getObservationInfo(observationType)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about your observation..."
              className="min-h-[100px]"
            />
          </div>

          {/* Save Button */}
          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={!observationType}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Observation
          </Button>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="observation-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Peak Day:</strong> The last day of clear, stretchy, or lubricative mucus</p>
            <p><strong>Fertile Window:</strong> Days with any mucus discharge</p>
            <p><strong>Infertile Days:</strong> Dry days and post-Peak phase</p>
            <p><strong>Observation Time:</strong> Best observed during routine bathroom use</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ObservationEntry;

