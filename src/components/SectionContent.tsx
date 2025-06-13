import React from 'react';
import { 
  Home as HomeIcon, 
  Users, 
  GraduationCap, 
  CreditCard, 
  Bell, 
  Settings,
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface SectionContentProps {
  activeSection: string;
}

const SectionContent: React.FC<SectionContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CalendarPro</h1>
              <p className="text-gray-600">Manage your events, programs, and team efficiently.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Events</h3>
                    <p className="text-2xl font-bold text-blue-600">24</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Members</h3>
                    <p className="text-2xl font-bold text-green-600">156</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Active members</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Programs</h3>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Active programs</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Revenue</h3>
                    <p className="text-2xl font-bold text-amber-600">$12.5k</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New event created: Team Stand-up</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">3 new members joined</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Programs</h1>
                <p className="text-gray-600">Manage your training programs and courses.</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>New Program</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Beginner Karate', students: 25, sessions: 12, color: 'blue' },
                { name: 'Advanced Training', students: 15, sessions: 8, color: 'purple' },
                { name: 'Kids Program', students: 30, sessions: 16, color: 'green' },
                { name: 'Competition Prep', students: 10, sessions: 6, color: 'amber' },
              ].map((program, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className={`w-12 h-12 bg-${program.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <GraduationCap className={`w-6 h-6 text-${program.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium">{program.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span className="font-medium">{program.sessions}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'people':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">People</h1>
                <p className="text-gray-600">Manage members and staff.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search people..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Add Person</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Members (156)</h2>
                  <button className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { name: 'John Smith', email: 'john@example.com', role: 'Student', status: 'Active' },
                  { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Instructor', status: 'Active' },
                  { name: 'Mike Wilson', email: 'mike@example.com', role: 'Student', status: 'Inactive' },
                  { name: 'Emily Davis', email: 'emily@example.com', role: 'Student', status: 'Active' },
                ].map((person, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{person.name}</h3>
                          <p className="text-sm text-gray-500">{person.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{person.role}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          person.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {person.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'memberships':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Memberships</h1>
                <p className="text-gray-600">Manage membership plans and billing.</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Plus className="w-4 h-4" />
                <span>New Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { name: 'Basic', price: '$29', period: 'month', features: ['2 classes/week', 'Basic equipment', 'Locker access'] },
                { name: 'Premium', price: '$59', period: 'month', features: ['Unlimited classes', 'All equipment', 'Personal training', 'Nutrition plan'] },
                { name: 'Family', price: '$99', period: 'month', features: ['Up to 4 members', 'All premium features', 'Family events'] },
              ].map((plan, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                <p className="text-gray-600">Stay updated with important alerts and messages.</p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                Mark all as read
              </button>
            </div>

            <div className="space-y-4">
              {[
                { title: 'New event created', message: 'Team Stand-up meeting scheduled for tomorrow', time: '2 hours ago', unread: true },
                { title: 'Payment received', message: 'Monthly membership payment from John Smith', time: '4 hours ago', unread: true },
                { title: 'Class cancelled', message: 'Advanced Karate class cancelled due to instructor illness', time: '1 day ago', unread: true },
                { title: 'New member joined', message: 'Sarah Johnson has joined the Premium plan', time: '2 days ago', unread: false },
                { title: 'Equipment maintenance', message: 'Scheduled maintenance for training equipment completed', time: '3 days ago', unread: false },
              ].map((notification, index) => (
                <div key={index} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${notification.unread ? 'border-l-4 border-l-blue-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                    <Bell className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your application preferences and configuration.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email updates about events and activities</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Get notified about upcoming events</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Month View</option>
                      <option>Week View</option>
                      <option>Day View</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Week Starts On</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Sunday</option>
                      <option>Monday</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="flex-1 bg-gray-50">{renderContent()}</div>;
};

export default SectionContent;