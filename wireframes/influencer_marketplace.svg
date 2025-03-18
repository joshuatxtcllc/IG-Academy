import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, Star, Users, BarChart3 } from 'lucide-react';

/**
 * InfluencerMarketplace Component
 * Elite tier feature for finding and contracting influencers
 */
const InfluencerMarketplace = () => {
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    audience: '',
    engagement: '',
    location: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch influencers data
  useEffect(() => {
    const fetchInfluencers = async () => {
      setIsLoading(true);
      try {
        // This would be replaced with an actual API call
        // Simulating API response
        const data = [
          {
            id: "inf_1",
            displayName: "Fashion Forward",
            handle: "fashionforward",
            platform: "instagram",
            avatar: null,
            category: ["fashion", "lifestyle"],
            audience: {
              size: 85000,
              demographics: {
                ageGroups: {
                  "18-24": 35,
                  "25-34": 42,
                  "35-44": 18,
                  "45+": 5
                }
        ];
        
        setInfluencers(data);
        setFilteredInfluencers(data);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInfluencers();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...influencers];
    
    // Apply search term
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(influencer => 
        influencer.displayName.toLowerCase().includes(lowercasedSearch) || 
        influencer.handle.toLowerCase().includes(lowercasedSearch) ||
        influencer.category.some(cat => cat.toLowerCase().includes(lowercasedSearch))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      results = results.filter(influencer => 
        influencer.category.some(cat => cat.toLowerCase() === filters.category.toLowerCase())
      );
    }
    
    // Apply audience size filter
    if (filters.audience) {
      switch (filters.audience) {
        case 'micro':
          results = results.filter(influencer => influencer.audience.size < 50000);
          break;
        case 'mid':
          results = results.filter(influencer => 
            influencer.audience.size >= 50000 && influencer.audience.size < 100000
          );
          break;
        case 'macro':
          results = results.filter(influencer => influencer.audience.size >= 100000);
          break;
      }
    }
    
    // Apply engagement filter
    if (filters.engagement) {
      switch (filters.engagement) {
        case 'high':
          results = results.filter(influencer => influencer.engagementRate >= 5);
          break;
        case 'medium':
          results = results.filter(influencer => 
            influencer.engagementRate >= 3 && influencer.engagementRate < 5
          );
          break;
        case 'low':
          results = results.filter(influencer => influencer.engagementRate < 3);
          break;
      }
    }
    
    // Apply location filter
    if (filters.location) {
      results = results.filter(influencer => 
        influencer.audience.topLocations.some(
          location => location.name.toLowerCase().includes(filters.location.toLowerCase())
        )
      );
    }
    
    setFilteredInfluencers(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, influencers]);

  // Get current page influencers
  const getCurrentInfluencers = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredInfluencers.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredInfluencers.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4">
      {/* Header Banner */}
      <div className="bg-purple-700 text-white px-6 py-10 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Influencer Marketplace</h1>
        <p className="text-purple-100">Find and collaborate with the perfect creators for your brand</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search influencers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Select 
              value={filters.category} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.audience} 
              onValueChange={(value) => handleFilterChange('audience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Audience Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Size</SelectItem>
                <SelectItem value="micro">Micro (< 50K)</SelectItem>
                <SelectItem value="mid">Mid (50K - 100K)</SelectItem>
                <SelectItem value="macro">Macro (> 100K)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.engagement} 
              onValueChange={(value) => handleFilterChange('engagement', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Engagement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Engagement</SelectItem>
                <SelectItem value="high">High (> 5%)</SelectItem>
                <SelectItem value="medium">Medium (3-5%)</SelectItem>
                <SelectItem value="low">Low (< 3%)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={filters.location} 
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Location</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="los angeles">Los Angeles</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading influencers...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="text-gray-500 mb-4">
            Found {filteredInfluencers.length} influencers matching your criteria
          </div>
          
          {/* Influencer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getCurrentInfluencers().map((influencer) => (
              <Card key={influencer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={influencer.avatar} alt={influencer.displayName} />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {getInitials(influencer.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{influencer.displayName}</h3>
                        <p className="text-gray-500">@{influencer.handle}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 my-4">
                      {influencer.category.map((cat, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-100 my-4 pt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Audience</p>
                          <p className="font-medium">{(influencer.audience.size / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Engagement</p>
                          <p className="font-medium">{influencer.engagementRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Rate</p>
                        <p className="text-lg font-bold">
                          {formatCurrency(influencer.pricing.post, influencer.currency)}
                          <span className="text-sm font-normal text-gray-500"> per post</span>
                        </p>
                      </div>
                      
                      <Button className="bg-purple-700 hover:bg-purple-800">
                        View Profile
                      </Button>
                    </div>
                    
                    {influencer.availability === 'limited' && (
                      <div className="mt-4 p-2 bg-amber-50 text-amber-700 rounded text-sm">
                        Limited availability - Book soon!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredInfluencers.length === 0 && (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No influencers found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search term</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    category: '',
                    audience: '',
                    engagement: '',
                    location: ''
                  });
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredInfluencers.length > 0 && (
            <Pagination className="my-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default InfluencerMarketplace;,
                genderSplit: {
                  female: 74,
                  male: 24,
                  other: 2
                }
              },
              topLocations: [
                { name: "New York", percentage: 15 },
                { name: "Los Angeles", percentage: 12 },
                { name: "London", percentage: 8 }
              ]
            },
            engagementRate: 3.8,
            avgComments: 120,
            contentTypes: ["photos", "reels"],
            pricing: {
              post: 850,
              story: 350,
              reel: 1200
            },
            currency: "USD",
            availability: "available",
            isPlatformVerified: true,
            rating: 4.8
          },
          {
            id: "inf_2",
            displayName: "Tech Chronicles",
            handle: "techchronicles",
            platform: "instagram",
            avatar: null,
            category: ["tech", "gadgets"],
            audience: {
              size: 125000,
              demographics: {
                ageGroups: {
                  "18-24": 22,
                  "25-34": 45,
                  "35-44": 28,
                  "45+": 5
                },
                genderSplit: {
                  female: 32,
                  male: 66,
                  other: 2
                }
              },
              topLocations: [
                { name: "San Francisco", percentage: 18 },
                { name: "New York", percentage: 12 },
                { name: "Seattle", percentage: 10 }
              ]
            },
            engagementRate: 4.2,
            avgComments: 145,
            contentTypes: ["photos", "videos", "reviews"],
            pricing: {
              post: 1200,
              story: 500,
              reel: 1500
            },
            currency: "USD",
            availability: "available",
            isPlatformVerified: true,
            rating: 4.6
          },
          {
            id: "inf_3",
            displayName: "Wellness Focus",
            handle: "wellnessfocus",
            platform: "instagram",
            avatar: null,
            category: ["health", "fitness"],
            audience: {
              size: 65000,
              demographics: {
                ageGroups: {
                  "18-24": 28,
                  "25-34": 40,
                  "35-44": 25,
                  "45+": 7
                },
                genderSplit: {
                  female: 68,
                  male: 30,
                  other: 2
                }
              },
              topLocations: [
                { name: "Los Angeles", percentage: 16 },
                { name: "Miami", percentage: 9 },
                { name: "Chicago", percentage: 7 }
              ]
            },
            engagementRate: 5.2,
            avgComments: 105,
            contentTypes: ["photos", "reels", "tutorials"],
            pricing: {
              post: 750,
              story: 300,
              reel: 950
            },
            currency: "USD",
            availability: "available",
            isPlatformVerified: true,
            rating: 4.9
          },
          {
            id: "inf_4",
            displayName: "Food Creations",
            handle: "foodcreations",
            platform: "instagram",
            avatar: null,
            category: ["food", "cooking"],
            audience: {
              size: 95000,
              demographics: {
                ageGroups: {
                  "18-24": 25,
                  "25-34": 38,
                  "35-44": 30,
                  "45+": 7
                },
                genderSplit: {
                  female: 65,
                  male: 33,
                  other: 2
                }
              },
              topLocations: [
                { name: "New York", percentage: 14 },
                { name: "Chicago", percentage: 10 },
                { name: "Toronto", percentage: 8 }
              ]
            },
            engagementRate: 4.7,
            avgComments: 130,
            contentTypes: ["photos", "reels", "recipes"],
            pricing: {
              post: 920,
              story: 380,
              reel: 1100
            },
            currency: "USD",
            availability: "available",
            isPlatformVerified: true,
            rating: 4.7
          },
          {
            id: "inf_5",
            displayName: "Travel Stories",
            handle: "travelstories",
            platform: "instagram",
            avatar: null,
            category: ["travel", "adventure"],
            audience: {
              size: 145000,
              demographics: {
                ageGroups: {
                  "18-24": 30,
                  "25-34": 42,
                  "35-44": 22,
                  "45+": 6
                },
                genderSplit: {
                  female: 55,
                  male: 43,
                  other: 2
                }
              },
              topLocations: [
                { name: "New York", percentage: 12 },
                { name: "London", percentage: 10 },
                { name: "Sydney", percentage: 8 }
              ]
            },
            engagementRate: 3.9,
            avgComments: 140,
            contentTypes: ["photos", "reels", "guides"],
            pricing: {
              post: 1350,
              story: 550,
              reel: 1800
            },
            currency: "USD",
            availability: "limited",
            isPlatformVerified: true,
            rating: 4.5
          },
          {
            id: "inf_6",
            displayName: "Beauty Blogger",
            handle: "beautyblogger",
            platform: "instagram",
            avatar: null,
            category: ["beauty", "skincare"],
            audience: {
              size: 112000,
              demographics: {
                ageGroups: {
                  "18-24": 40,
                  "25-34": 35,
                  "35-44": 20,
                  "45+": 5
                },
                genderSplit: {
                  female: 88,
                  male: 10,
                  other: 2
                }
              },
              topLocations: [
                { name: "Los Angeles", percentage: 15 },
                { name: "New York", percentage: 12 },
                { name: "Miami", percentage: 8 }
              ]
            },
            engagementRate: 4.5,
            avgComments: 175,
            contentTypes: ["photos", "reels", "tutorials"],
            pricing: {
              post: 980,
              story: 420,
              reel: 1250
            },
            currency: "USD",
            availability: "available",
            isPlatformVerified: true,
            rating: 4.4
          }
