import React from 'react';
import { BrainCircuit, Lightbulb, Sparkles, Target } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const Insights = () => {
  const insights = [
    {
      id: 1,
      type: 'critical',
      title: 'Dropout Risk Cluster Identified',
      description: 'The AI model has identified a pattern of declining attendance and missed assignments among 5 students in 10th grade over the last 3 weeks.',
      action: 'Review cohort',
      icon: Target
    },
    {
      id: 2,
      type: 'positive',
      title: 'Math Performance Improvement',
      description: 'Students who attended the new after-school tutoring sessions showed an average 12% increase in their recent test scores.',
      action: 'View correlation',
      icon: Sparkles
    },
    {
      id: 3,
      type: 'neutral',
      title: 'Resource Allocation Opportunity',
      description: 'Usage of the science lab is currently 40% lower on Thursdays compared to the rest of the week.',
      action: 'Adjust schedule',
      icon: Lightbulb
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Learning Insights</h1>
        <p className="text-text-secondary">AI-driven actionable intelligence for your institution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <Card className="bg-gradient-to-br from-navy to-navy-muted border-none text-white p-8 col-span-full md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col items-start gap-4 h-full justify-center">
            <Badge variant="neutral" className="bg-white/10 text-white backdrop-blur-md border-none">System Summary</Badge>
            <h2 className="text-2xl font-bold leading-tight">InsightED has analyzed 12,450 data points this week.</h2>
            <p className="text-white/80 max-w-lg mb-2">Overall student engagement is up by 4.2%. However, an attendance anomaly was detected in 9th grade Science classes.</p>
            <Button className="bg-gold hover:brightness-110 text-white border-none shadow-glow">Generate Full Report</Button>
          </div>
        </Card>

        <Card className="flex flex-col justify-center items-center text-center p-8 bg-gold-light/30 border-none">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
            <BrainCircuit size={32} className="text-gold" />
          </div>
          <h3 className="text-xl font-bold text-navy mb-2">AI Active</h3>
          <p className="text-text-secondary text-sm">Predictive models are running optimally. Next sync in 2 hours.</p>
        </Card>
      </div>

      <h3 className="text-xl font-semibold text-navy mb-2">Actionable Intelligence</h3>
      <div className="flex flex-col gap-4">
        {insights.map(insight => {
          const Icon = insight.icon;
          return (
            <Card key={insight.id} hover className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6">
              <div className="flex gap-4">
                <div className={`mt-1 w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${
                  insight.type === 'critical' ? 'bg-danger-light text-danger' :
                  insight.type === 'positive' ? 'bg-success-light text-success' : 'bg-info-light text-info'
                }`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-navy mb-1">{insight.title}</h4>
                  <p className="text-text-secondary">{insight.description}</p>
                </div>
              </div>
              <Button variant="outline" className="shrink-0">{insight.action}</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;
