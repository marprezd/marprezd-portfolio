export default {
  site: {
    metadata: {
      title: 'Mario Pérez | Full Stack Yazılım Geliştirici',
      description: 'Yazılım geliştiricisiyim ve Python, Nuxt.js ve diğer web teknolojileri ile modern web uygulamaları ve şık kullanıcı arayüzleri oluşturmayı öğretiyorum',
      generator: 'Mario Pérez - Kişisel web sitesi',
      ogDescription: 'Ben bir Yazılım geliştiricisiyim ve Python, Nuxt.js ve diğer web teknolojileri ile modern web uygulamaları ve şık kullanıcı arayüzleri oluşturmayı öğretiyorum. Baştan sona web uygulamaları oluşturmak için gerçek kod örnekleri üzerinden yürüyeceğiz.',
    },
    layout: {
      'users': {
        'title': 'Yazılım geliştiricisi',
        'availability-to-job': {
          'label': 'İşe uygunluk',
          'is-open': 'İş fırsatlarına açığım!',
          'is-busy': 'Yoğunum ama iş tekliflerini dinliyorum!',
        },
      },
      'nav': {
        main: {
          labels: {
            'sidebar-group': 'Ana Gezinme',
            'sidebar-item': 'Sayfa',
          },
          items: {
            home: 'Anasayfa',
            projects: 'Projeler',
            resources: 'Kaynaklar',
            about: 'Benim Hakkında',
            hire: 'Beni işe al',
          },
        },
        tutorials: {
          labels: {
            'sidebar-group': 'Yazılım geliştirme',
            'sidebar-item': 'Eğitimler',
          },
          items: {
            courses: 'Dersler',
            blog: 'Blog',
          },
        },
        communities: {
          labels: {
            'sidebar-group': 'Topluluğumuza katılın',
            'sidebar-item': 'Topluluklar',
          },
          items: {
            'guest-book': 'Misafir defteri',
          },
        },
      },
      'social-networks': 'Sosyal ağlar',
      'available-languages': 'Mevcut diller',
      'color-mode': {
        label: 'Arayüz rengi',
        light: 'Açık',
        dark: 'Karanlık',
        system: 'Sistem',
      },
      'search': {
        'label': 'Gönderileri ara',
        'placeholder': 'İlginç bir şey bulalım!',
        'not-result': 'Sonuç bulunamadı.',
      },
    },
  },
}
