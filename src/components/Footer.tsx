import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div class="space-y-4 col-span-1 md:col-span-1">
            <Link to="/" class="flex items-center space-x-2 text-white font-extrabold text-xl tracking-tight">
              <GraduationCap class="w-8 h-8 text-secondary" />
              <span>EduSphere</span>
            </Link>
            <p class="text-sm text-slate-400 leading-relaxed">
              EduSphere is a leading digital school administration portal designed to streamline academic curriculum coordination, statistics, and records management.
            </p>
            {/* Social Links */}
            <div class="flex space-x-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="hover:text-secondary transition-colors text-slate-400" aria-label="Twitter">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-secondary transition-colors text-slate-400" aria-label="Facebook">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-secondary transition-colors text-slate-400" aria-label="LinkedIn">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-secondary transition-colors text-slate-400" aria-label="GitHub">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <Link to="/" class="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/classes" class="hover:text-white transition-colors">Explore Classes</Link>
              </li>
              <li>
                <Link to="/about" class="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" class="hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="/about" class="hover:text-white transition-colors">Academic Syllabus</a>
              </li>
              <li>
                <a href="/classes" class="hover:text-white transition-colors">Admissions Portal</a>
              </li>
              <li>
                <a href="/contact" class="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="/about" class="hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start space-x-2">
                <MapPin class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span class="text-slate-400">100 Academic Circle, Suite 500, Boston, MA 02108</span>
              </li>
              <li class="flex items-center space-x-2">
                <Phone class="w-5 h-5 text-secondary flex-shrink-0" />
                <span class="text-slate-400">+1 (800) 555-0199</span>
              </li>
              <li class="flex items-center space-x-2">
                <Mail class="w-5 h-5 text-secondary flex-shrink-0" />
                <span class="text-slate-400">support@edusphere.com</span>
              </li>
            </ul>
          </div>

        </div>

        <hr class="border-slate-800 my-8" />

        <div class="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} EduSphere. All rights reserved.</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="/about" class="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/about" class="hover:text-white transition-colors">Terms of Use</a>
            <a href="/about" class="hover:text-white transition-colors">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
