
import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  
  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available soon!",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">EliteBuilders</h3>
            <p className="text-sm">
              The premier platform for AI builders to showcase skills and get discovered.
            </p>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/challenges" className="hover:text-white transition-colors">Challenges</Link></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Builder Profiles</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">For Sponsors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Post a Challenge</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">View Submissions</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Sponsor Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); showComingSoon();}} className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} EliteBuilders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
