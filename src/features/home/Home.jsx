import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Mic, Share2, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';

/**
 * Home page component
 */
const Home = () => {
  const { state, isLoading: locationLoading } = useLocation();
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="space-y-8">
      <section className="text-center py-12 px-4">
        <h1 className="text-display font-bold mb-4">Your rights, your words, instantly accessible.</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Pocket Rights Shield provides instant, mobile-optimized legal information and communication scripts for interactions with law enforcement, empowering you with knowledge and documentation tools.
        </p>
        
        {locationLoading ? (
          <p className="text-sm text-neutral-900/60">Detecting your location...</p>
        ) : state ? (
          <p className="text-sm text-neutral-900/60">
            Currently showing information for <span className="font-semibold">{state}</span>
          </p>
        ) : (
          <p className="text-sm text-neutral-900/60">
            Location not available. You can manually select your state in the Rights Guide.
          </p>
        )}
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/rights-guide">View Your Rights</Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild>
            <Link to="/scripts">Access Scripts</Link>
          </Button>
        </div>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          title="State-Specific Rights Guide"
          description="Access a mobile-optimized, one-page summary of your rights during police stops, tailored to your location."
          icon={<Shield className="h-8 w-8 text-primary" />}
          link="/rights-guide"
        />
        
        <FeatureCard
          title="Pre-written Scripts"
          description="Get contextualized scripts for common interaction scenarios with law enforcement in multiple languages."
          icon={<FileText className="h-8 w-8 text-primary" />}
          link="/scripts"
        />
        
        <FeatureCard
          title="Quick Record & Alert"
          description="Instantly record audio/video of an interaction and send an alert with your location to emergency contacts."
          icon={<Mic className="h-8 w-8 text-primary" />}
          link="/record"
        />
        
        <FeatureCard
          title="Shareable Cards"
          description="Generate and share location-aware cards with relevant rights information and scripts."
          icon={<Share2 className="h-8 w-8 text-primary" />}
          link="/share"
        />
      </section>
      
      {!isAuthenticated && (
        <section className="bg-primary/10 rounded-lg p-6 text-center">
          <h2 className="text-heading font-semibold mb-4">Create an Account</h2>
          <p className="mb-6">
            Sign up to save your preferences, access premium features, and set up emergency contacts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </section>
      )}
      
      {isAuthenticated && !user?.isPremium && (
        <section className="bg-accent/10 rounded-lg p-6 text-center">
          <h2 className="text-heading font-semibold mb-4">Upgrade to Premium</h2>
          <p className="mb-6">
            Get access to multilingual scripts, unlimited recordings, emergency alerts, and more.
          </p>
          <Button asChild>
            <Link to="/pricing">
              <CreditCard className="mr-2 h-4 w-4" />
              View Premium Plans
            </Link>
          </Button>
        </section>
      )}
    </div>
  );
};

/**
 * Feature card component
 */
const FeatureCard = ({ title, description, icon, link }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-4">
        <Button variant="outline" asChild className="w-full">
          <Link to={link}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;
