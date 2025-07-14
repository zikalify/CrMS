import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Lightbulb, Heart, TrendingUp, Users, Shield } from 'lucide-react';

const EducationHub = ({ onNavigate }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const educationTopics = [
    {
      id: 'basics',
      title: 'CrMS Basics',
      icon: BookOpen,
      description: 'Understanding the fundamentals of the Creighton Model',
      content: {
        overview: "The Creighton Model FertilityCare™ System (CrMS) is a standardized modification of the Billings Ovulation Method. It empowers women to understand their natural fertility cycles through careful observation of biological markers.",
        keyPoints: [
          "Based on standardized observation of cervical mucus",
          "Can be used to achieve or avoid pregnancy",
          "Provides insights into reproductive health",
          "Requires no artificial hormones or devices",
          "Effectiveness rates of 96.8-99.5% for avoiding pregnancy"
        ],
        tips: [
          "Make observations during routine bathroom use",
          "Record observations immediately",
          "Be consistent with timing of observations",
          "Don't rely on internal examinations"
        ]
      }
    },
    {
      id: 'observations',
      title: 'Making Observations',
      icon: TrendingUp,
      description: 'How to accurately observe and record fertility signs',
      content: {
        overview: "Accurate observation is the foundation of the Creighton Model. Learning to identify different types of cervical mucus and other fertility signs is essential for effective use of the system.",
        keyPoints: [
          "Observe mucus at the vulva during bathroom use",
          "Note color, consistency, and stretchability",
          "Record the most fertile observation of the day",
          "Distinguish between mucus and other discharge",
          "Track bleeding patterns accurately"
        ],
        mucusTypes: [
          {
            type: "Dry",
            description: "No mucus discharge observed",
            fertility: "Infertile (when in post-Peak phase)"
          },
          {
            type: "Sticky",
            description: "Thick, tacky, or pasty mucus",
            fertility: "Beginning fertility"
          },
          {
            type: "Creamy",
            description: "Smooth, lotion-like consistency",
            fertility: "Developing fertility"
          },
          {
            type: "Clear/Stretchy",
            description: "Clear, stretchy, or lubricative",
            fertility: "Peak fertility"
          }
        ]
      }
    },
    {
      id: 'peak-day',
      title: 'Understanding Peak Day',
      icon: Heart,
      description: 'Identifying and understanding the significance of Peak Day',
      content: {
        overview: "Peak Day is the last day of clear, stretchy, or lubricative mucus discharge. It correlates closely with ovulation and is crucial for understanding your fertility pattern.",
        keyPoints: [
          "Peak Day is identified retrospectively",
          "Usually occurs within 24-48 hours of ovulation",
          "Marks the transition from fertile to infertile phase",
          "Post-Peak phase is typically 12-16 days",
          "Essential for timing intercourse for pregnancy achievement"
        ],
        identification: [
          "Look for the last day of the most fertile mucus",
          "Clear, stretchy mucus that may resemble raw egg white",
          "Lubricative sensation",
          "Can only be confirmed after mucus changes or disappears"
        ]
      }
    },
    {
      id: 'health',
      title: 'Health Monitoring',
      icon: Shield,
      description: 'Using CrMS for reproductive health awareness',
      content: {
        overview: "The Creighton Model provides valuable insights into reproductive health beyond fertility awareness. Abnormal patterns can indicate underlying health issues.",
        keyPoints: [
          "Irregular bleeding patterns may indicate hormonal issues",
          "Absence of fertile mucus could suggest ovulation problems",
          "Continuous mucus discharge may need evaluation",
          "Short post-Peak phases might indicate luteal phase defects",
          "CrMS data helps healthcare providers with diagnosis"
        ],
        healthSigns: [
          {
            sign: "Irregular Cycles",
            meaning: "May indicate hormonal imbalances or PCOS"
          },
          {
            sign: "No Peak Day",
            meaning: "Possible anovulation or hormonal issues"
          },
          {
            sign: "Short Post-Peak Phase",
            meaning: "Potential luteal phase deficiency"
          },
          {
            sign: "Continuous Bleeding",
            meaning: "May require medical evaluation"
          }
        ]
      }
    },
    {
      id: 'effectiveness',
      title: 'Effectiveness & Success',
      icon: TrendingUp,
      description: 'Understanding the effectiveness of the Creighton Model',
      content: {
        overview: "When used correctly, the Creighton Model is highly effective for both achieving and avoiding pregnancy. Success depends on proper instruction, accurate observations, and consistent application.",
        effectiveness: [
          {
            purpose: "Avoiding Pregnancy",
            rate: "96.8-99.5%",
            conditions: "With proper instruction and consistent use"
          },
          {
            purpose: "Achieving Pregnancy",
            rate: "Up to 98%",
            conditions: "In couples with normal fertility"
          },
          {
            purpose: "With NaProTECHNOLOGY",
            rate: "Up to 80%",
            conditions: "For couples with infertility issues"
          }
        ],
        successFactors: [
          "Proper instruction from certified FertilityCare Practitioner",
          "Consistent daily observations",
          "Accurate charting and record-keeping",
          "Following system guidelines precisely",
          "Mutual cooperation between partners"
        ]
      }
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle & Relationships',
      icon: Users,
      description: 'How CrMS impacts relationships and daily life',
      content: {
        overview: "The Creighton Model is more than a fertility awareness method - it's a lifestyle that promotes communication, mutual respect, and shared responsibility in relationships.",
        benefits: [
          "Increased communication between partners",
          "Shared responsibility for family planning",
          "Greater appreciation for natural fertility",
          "No side effects from artificial hormones",
          "Cost-effective compared to contraceptives"
        ],
        lifestyle: [
          "Daily observation becomes routine",
          "Partners learn to communicate about fertility",
          "Respect for natural body processes",
          "Planning intimate moments around fertility goals",
          "Building trust and cooperation"
        ]
      }
    }
  ];

  const renderTopicContent = (topic) => {
    const content = topic.content;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedTopic(null)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <p className="text-muted-foreground">{topic.description}</p>
          </div>
        </div>

        <Card className="observation-card">
          <CardContent className="p-6">
            <p className="text-base leading-relaxed mb-6">{content.overview}</p>
            
            {content.keyPoints && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.mucusTypes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Mucus Types</h3>
                <div className="space-y-3">
                  {content.mucusTypes.map((type, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <h4 className="font-medium text-primary">{type.type}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <p className="text-sm font-medium mt-1">{type.fertility}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.effectiveness && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Effectiveness Rates</h3>
                <div className="space-y-3">
                  {content.effectiveness.map((item, index) => (
                    <div key={index} className="p-3 bg-secondary/20 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.purpose}</h4>
                          <p className="text-sm text-muted-foreground">{item.conditions}</p>
                        </div>
                        <span className="text-lg font-bold text-primary">{item.rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.tips && (
              <div className="educational-tip">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Tips for Success</h3>
                    <ul className="space-y-1">
                      {content.tips.map((tip, index) => (
                        <li key={index} className="text-sm">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  if (selectedTopic) {
    return (
      <div className="space-y-6 p-4 max-w-4xl mx-auto">
        {renderTopicContent(selectedTopic)}
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Education Hub</h1>
          <p className="text-muted-foreground">Learn about the Creighton Model FertilityCare System</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="educational-tip">
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Welcome to CrMS Education</h3>
            <p className="text-sm">
              The Creighton Model FertilityCare™ System empowers you to understand your body's natural fertility signs. 
              Explore the topics below to deepen your knowledge and improve your practice of this natural method.
            </p>
          </div>
        </div>
      </div>

      {/* Education Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationTopics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <Card 
              key={topic.id}
              className="observation-card cursor-pointer hover:bg-secondary/10" 
              onClick={() => setSelectedTopic(topic)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Resources */}
      <Card className="observation-card">
        <CardHeader>
          <CardTitle>Quick Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">Find a FertilityCare Practitioner</h4>
              <p className="text-sm text-muted-foreground">
                For personalized instruction and support, connect with a certified practitioner in your area.
              </p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">Official CrMS Resources</h4>
              <p className="text-sm text-muted-foreground">
                Visit creightonmodel.com for official information and research about the Creighton Model.
              </p>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <h4 className="font-medium">NaProTECHNOLOGY</h4>
              <p className="text-sm text-muted-foreground">
                Learn about reproductive health treatments that work with your natural cycles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationHub;

