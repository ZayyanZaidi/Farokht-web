/** Layout, colors, and copy matched to Reference/Home *.png screenshots */

import imgBasicSkincare from '../assets/NewContent/basic-skincare.png';
import imgBareillyBaazar from '../assets/NewContent/bareilly-baazar.png';
import imgRetrossoireStudio from '../assets/NewContent/retrossoire-studio.png';
import imgMahamMakesStuff from '../assets/NewContent/maham-makes-stuff.png';
import imgMyGrambini from '../assets/NewContent/my-grambini.png';

export const BRAND_CARDS = [
  {
    id: 'saya',
    name: 'SAYA',
    category: 'FASHION',
    bg: '#E8D5C4',
    ink: '#1a1a1a',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059ce5829?w=400&h=520&fit=crop',
    link: '/directory?category=Fashion'
  },
  {
    id: 'purpur',
    name: 'purpur',
    category: 'SKINCARE',
    bg: '#1B4D4A',
    ink: '#ffffff',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=520&fit=crop',
    link: '/directory?category=Beauty'
  },
  {
    id: 'foodfusion',
    name: 'FoodFusion',
    category: 'FOOD',
    bg: '#E8B923',
    ink: '#1a1a1a',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=520&fit=crop',
    link: '/directory?category=Food'
  },
  {
    id: 'duck',
    name: 'duck',
    category: 'ACCESSORIES',
    bg: '#F47B20',
    ink: '#ffffff',
    image: 'https://images.unsplash.com/photo-1601924992562-54a416ea9a88?w=400&h=520&fit=crop',
    link: '/directory?category=Fashion'
  },
  {
    id: 'ecostudio',
    name: 'ECO STUDIO',
    category: 'HOME',
    bg: '#1B4D4A',
    ink: '#ffffff',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=520&fit=crop',
    link: '/directory?category=Home'
  },
  {
    id: 'maazjee',
    name: 'MAAZJEE',
    category: 'FASHION',
    bg: '#7EC8C8',
    ink: '#1a1a1a',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=520&fit=crop',
    link: '/directory?category=Fashion'
  },
  {
    id: 'basic-skincare',
    name: 'Basic Skincare',
    category: 'SKINCARE',
    bg: '#E8612D',
    ink: '#ffffff',
    image: imgBasicSkincare,
    link: '/directory?category=Beauty',
    showcase: true
  },
  {
    id: 'bareilly-baazar',
    name: 'Bareilly Baazar',
    category: 'HERITAGE',
    bg: '#5C4A3A',
    ink: '#ffffff',
    image: imgBareillyBaazar,
    link: '/directory?category=Heritage',
    showcase: true
  },
  {
    id: 'retrossoire-studio',
    name: 'Retrossoire Studio',
    category: 'HOME DECOR',
    bg: '#2A2A2A',
    ink: '#ffffff',
    image: imgRetrossoireStudio,
    link: '/directory?category=Home',
    showcase: true
  },
  {
    id: 'maham-makes-stuff',
    name: 'Maham Makes Stuff',
    category: 'HANDMADE',
    bg: '#C4A8D4',
    ink: '#ffffff',
    image: imgMahamMakesStuff,
    link: '/directory?category=Handmade',
    showcase: true
  },
  {
    id: 'my-grambini',
    name: 'My Grambini',
    category: 'WELLNESS',
    bg: '#C47A7A',
    ink: '#ffffff',
    image: imgMyGrambini,
    link: '/directory?category=Wellness',
    showcase: true
  }
];

export const FEED_POSTS = [
  {
    id: 1,
    handle: 'HouseOfChikankari',
    time: '2h ago',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
    price: 'Rs. 4,250',
    tilt: -6,
    liked: true
  },
  {
    id: 2,
    handle: 'Allure Cosmetics',
    time: '5h ago',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403b0a?w=400&h=500&fit=crop',
    price: 'Rs. 2,450',
    tilt: -2
  },
  {
    id: 3,
    handle: 'LuxeByHira',
    time: '1h ago',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    price: 'Rs. 6,990',
    tilt: 0,
    isNew: true
  },
  {
    id: 4,
    handle: 'The Happy Home',
    time: '3h ago',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop',
    price: 'Rs. 1,850',
    tilt: 2
  },
  {
    id: 5,
    handle: 'Nuts & Seeds Co.',
    time: '12h ago',
    image: 'https://images.unsplash.com/photo-1558171813-1c045a1e1f4b?w=400&h=500&fit=crop',
    price: 'Rs. 890',
    tilt: 6
  }
];

export const HERO_DISCOVERY_POSTS = [
  {
    id: 'h1',
    likes: '1,210',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=340&fit=crop',
    rotate: -14,
    z: 1
  },
  {
    id: 'h2',
    likes: '892',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=280&h=340&fit=crop',
    rotate: 2,
    z: 2
  },
  {
    id: 'h3',
    likes: '2.4K',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=280&h=340&fit=crop',
    rotate: 12,
    z: 3
  }
];

export const CYAN_SLIDES = [
  {
    id: 'culture',
    title: 'Kahaniaa, Content, Culture & Shopping',
    phoneVariant: 'app',
    paragraphs: [
      'Storytelling and human connection will define the next decade, even with all the AI noise.',
      'Every street and brand in Pakistan carries a story of culture, identity, and belonging. Farokht is Pakistan\'s own content-commerce platform.',
      'We are building a second home for Instagram brands — scroll, watch, and shop without leaving the ecosystem you trust.'
    ]
  },
  {
    id: 'responsible',
    title: 'Responsible Selling Initiative',
    phoneVariant: 'verified',
    paragraphs: [
      "Farokht's main goal is responsible selling. We want to bring transparency, honesty, and accountability back to online shopping.",
      'Today, online selling in Pakistan has become messy. In our first street survey, we found that 1 out of 3 shoppers has faced fraud while buying from online brands.',
      'Farokht is solving this with four steps of verification before any brand joins our platform — so shoppers only see brands they can trust.'
    ]
  }
];

export const BRAND_PROFILE = {
  name: 'The Munch Lab',
  handle: 'themunchlab',
  tagline: 'The Munch Lab by Shim Food and Humaira Patel — artisan cookies & gifting.',
  banner: 'https://images.unsplash.com/photo-1558961363-fa8ccf83aeb3?w=600&h=200&fit=crop',
  logo: 'https://images.unsplash.com/photo-1558961363-fa8ccf83aeb3?w=120&h=120&fit=crop',
  catalogue: [
    { name: 'Mini Cookies with Nutella Dip', price: 600, rating: 4.9, image: 'https://images.unsplash.com/photo-1558961363-fa8ccf83aeb3?w=200&h=200&fit=crop' },
    { name: 'Signature Cookies Tin', price: 2227, rating: 5.0, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop' }
  ],
  posts: [
    'https://images.unsplash.com/photo-1558961363-fa8ccf83aeb3?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1606890737304-57e7c8d8ad1a?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1578985545061-69928b1d9587?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587241321927-ea3d2e7e0b8f?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop'
  ],
  hours: [
    { day: 'Monday – Sunday', time: '9:00 AM – 9:00 PM' }
  ]
};

export const CAMPAIGN_VIDEOS = [
  { id: 1, handle: '@sarah.khan.official', likes: '8.2K', comments: '120', duration: '0:15', thumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=420&fit=crop', tilt: -5 },
  { id: 2, handle: '@purpur.pk', likes: '5.1K', comments: '89', duration: '0:22', thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=420&fit=crop', tilt: 3 },
  { id: 3, handle: '@sayaofficial', likes: '12K', comments: '340', duration: '0:18', thumb: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=420&fit=crop', tilt: -2 },
  { id: 4, handle: '@foodfusionpk', likes: '3.4K', comments: '56', duration: '0:30', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=420&fit=crop', tilt: 4 }
];

export const PODCAST_EPISODES = [
  {
    id: 'ep12',
    episode: 'EPISODE 12',
    title: 'Broken Packaging = Wasted Material, Effort & Trust',
    duration: '26:45 min',
    tag: 'Packaging',
    tagColor: '#007A7A',
    image: 'https://images.unsplash.com/photo-1589939705382-099ae025eaeb?w=600&h=340&fit=crop'
  },
  {
    id: 'ep11',
    episode: 'EPISODE 11',
    title: 'So You Mean, Reviews Are Just Fake Noise?',
    duration: '31:10 min',
    tag: 'Reviews & Trust',
    tagColor: '#F28C38',
    image: 'https://images.unsplash.com/photo-1556745757-7563817ebeb3?w=600&h=340&fit=crop'
  },
  {
    id: 'ep10',
    episode: 'EPISODE 10',
    title: 'Tech Gap. Growth Cap.',
    duration: '28:02 min',
    tag: 'Ecommerce Growth',
    tagColor: '#007A7A',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop'
  }
];

export const WIDGETS = {
  supportLocalScene: '/assets/widgets/support-local-scene.png',
  footerWoman: '/assets/widgets/footer-woman.png'
};

/** Phone mockups — What Farokht Brings You (Home 5) */
export const PHONE_MOCKUPS = {
  splash: 'https://images.unsplash.com/photo-1556745757-7563817ebeb3?w=400&h=700&fit=crop',
  feedTiles: [
    'https://images.unsplash.com/photo-1595777457583-95e059ce5829?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
  ],
  verified: {
    banner: 'https://images.unsplash.com/photo-1583497013669-9479a74c1117?w=400&h=120&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    products: [
      {
        name: 'Multicolor Handcrafted Floral Necklace Set',
        price: 'Rs. 4,250',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop'
      },
      {
        name: 'Embroidered Kurta — Summer Collection',
        price: 'Rs. 6,990',
        image: 'https://images.unsplash.com/photo-1583497013669-9479a74c1117?w=200&h=200&fit=crop'
      }
    ],
    profileBanner: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop'
  }
};
