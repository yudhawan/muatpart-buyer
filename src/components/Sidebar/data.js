export const navigationGroups = [
  {
    id: 'group1',
    items: [
      { id: 'favorite', icon: '/icons/heart-outline.svg', label: 'Favorit', url: '/profile/album' },
      { id: 'voucher', icon: '/icons/sidebar/pusatpromosi.svg', label: 'Voucher Saya', url: '/profile/voucher' }
    ]
  },
  {
    id: 'group2',
    items: [
      { id: 'orders', icon: '/icons/sidebar/kelolapesanan.svg', label: 'Daftar Pesanan', url: '/profile/orders' },
      { id: 'reviews', icon: '/icons/sidebar/ulasan.svg', label: 'Ulasan Produk', url: '/profile/reviews' },
      { id: 'complaints', icon: '/icons/sidebar/komplain.svg', label: 'Pengajuan Komplain', url: '/profile/complaints' },
      { id: 'insurance', icon: '/icons/sidebar/asuransi.svg', label: 'Asuransi Produk', url: '/profile/insurance' },
      { id: 'discussions', icon: '/icons/sidebar/diskusi.svg', label: 'Diskusi Produk', url: '/profile/discussions' }
    ]
  },
  {
    id: 'group3',
    title: 'Profil Akun',
    items: [
      { id: 'profile', icon: '/icons/sidebar/profile.svg', label: 'Profil', url: '/profile' },
      { id: 'settings', icon: '/icons/sidebar/account-setting.svg', label: 'Pengaturan Akun', url: '/settings' },
      { id: 'bank', icon: '/icons/sidebar/account-setting.svg', label: 'Rekening Bank', url: '/bank' },
      { id: 'location', icon: '/icons/sidebar/location-management.svg', label: 'Manajemen Lokasi', url: '/location' },
      { id: 'users', icon: '/icons/sidebar/user-management.svg', label: 'Manajemen User', url: '/users' },
      { id: 'roles', icon: '/icons/sidebar/role-management.svg', label: 'Manajemen Role', url: '/roles' }
    ]
  },
  {
    id: 'group4',
    items: [
      { id: 'help', icon: '/icons/sidebar/help-center.svg', label: 'Pusat Bantuan', url: '/help' }
    ]
  }
];