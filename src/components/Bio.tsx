import React from 'react';
import { Instagram, Mail, Camera, Palette, Award } from 'lucide-react';

const Bio: React.FC = () => {
  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-20 md:pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            About Darren
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
               This is paragraph 1 of the bio... 
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
               This is paragraph 2 of the bio...
              </p>

              <p className="text-gray-600 leading-relaxed">
               This is paragraph 3 of the bio...
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Darren Gennetten"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-medium text-gray-900 mb-8 text-center">
            Skills & Expertise
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-gray-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Brand Design</h4>
              <p className="text-sm text-gray-600">
                Logo design, brand identity, marketing materials, and visual guidelines.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-gray-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Photography</h4>
              <p className="text-sm text-gray-600">
                Portrait, landscape, street photography, and commercial shoots.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-gray-600" size={24} />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Creative Direction</h4>
              <p className="text-sm text-gray-600">
                Art direction, creative strategy, and comprehensive project management.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h3 className="text-2xl font-medium text-gray-900 mb-8">
            Let's Connect
          </h3>
          
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:darren@gennetten.com"
              className="group flex items-center space-x-3 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Mail size={20} />
              <span className="font-medium">Email Me</span>
            </a>
            
            <a
              href="https://instagram.com/darrengennetten"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all"
            >
              <Instagram size={20} />
              <span className="font-medium">Follow</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;