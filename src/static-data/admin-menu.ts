export type AdminMenuItem = {
  label: string;
  href: string;
  icon: string;
};

export type AdminMenuSection = {
  title: string;
  icon: string;
  items: AdminMenuItem[];
};

export const adminMenuSections: AdminMenuSection[] = [
  {
    title: 'Overview',
    icon: 'dashboard',
    items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' }],
  },
  {
    title: 'Catalog',
    icon: 'inventory_2',
    items: [
      { label: 'Products', href: '/admin/products', icon: 'inventory_2' },
      { label: 'Categories', href: '/admin/categories', icon: 'grid_view' },
      { label: 'Brands', href: '/admin/brands', icon: 'workspace_premium' },
      { label: 'Attributes', href: '/admin/attributes', icon: 'tune' },
    ],
  },
  {
    title: 'Marketing',
    icon: 'campaign',
    items: [
      { label: 'Offers & Deals', href: '/admin/offers', icon: 'percent' },
      {
        label: 'Coupons',
        href: '/admin/coupons',
        icon: 'confirmation_number',
      },
      { label: 'Banners', href: '/admin/banners', icon: 'image' },
    ],
  },
  {
    title: 'Content',
    icon: 'article',
    items: [
      { label: 'CMS Pages', href: '/admin/cms-pages', icon: 'description' },
      { label: 'Reviews', href: '/admin/reviews', icon: 'star' },
      {
        label: 'Website layout',
        href: '/admin/website-layout',
        icon: 'view_quilt',
      },
    ],
  },
  {
    title: 'Blog',
    icon: 'newspaper',
    items: [
      { label: 'Blog Posts', href: '/admin/blogs', icon: 'article' },
      {
        label: 'Blog Categories',
        href: '/admin/blog-categories',
        icon: 'account_tree',
      },
      { label: 'Blog Tags', href: '/admin/blog-tags', icon: 'sell' },
    ],
  },
  {
    title: 'Customers',
    icon: 'group',
    items: [
      { label: 'Orders', href: '/admin/orders', icon: 'assignment' },
      { label: 'User', href: '/admin/customers', icon: 'group' },
      {
        label: 'Delete Requests',
        href: '/admin/delete-requests',
        icon: 'person_remove',
      },
      {
        label: 'Product Reviews',
        href: '/admin/product-reviews',
        icon: 'reviews',
      },
      {
        label: 'Product FAQ',
        href: '/admin/product-faq',
        icon: 'contact_support',
      },
      {
        label: 'Contact Us Leads',
        href: '/admin/contact-us-leads',
        icon: 'mail',
      },
    ],
  },
  {
    title: 'System',
    icon: 'settings',
    items: [{ label: 'Settings', href: '/admin/settings', icon: 'settings' }],
  },
];
