interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'الحوادث',
    url: '/dashboard'
  },
  {
    title: true,
    name: 'الحوادث'
  },
  {
    name: 'جداول و تقارير',
    url: '/base',
    icon: 'icon-pencil',
    children: [
      {
        name: ' جدول الاعتداءات اليومية ',
        url: '/base/تقارير',
        icon: 'icon-pencil',
      },
      {
        name: ' تقرير الاعلام',
        url: '/base/اعلام_بحدث',
        icon: 'icon-pencil',
      },
      {
        name: 'تقارير حادث شغل',
        url: '/base/تقارير حادث شغل',
        icon: 'icon-puzzle'
      },
      {
        name: 'تقارير حادث مرور',
        url: '/base/تقارير حادث مرور',
        icon: 'icon-puzzle'
      },
      {
        name: 'تقارير حادث طريق',
        url: '/base/تقارير حادث طريق',
        icon: 'icon-puzzle'
      },
      {
        name: 'حادث شغل',
        url: '/base/accidentstravail',
        icon: 'icon-puzzle'
      },
      {
        name: 'حادث طريق',
        url: '/base/accidentsroute',
        icon: 'icon-puzzle'
      },
      {
        name: 'حادث مرور',
        url: '/base/accidentscollision',
        icon: 'icon-puzzle'
      },
      {
        name: 'قائمة العمال',
        url: '/base/قائمة العمال',
        icon: 'icon-puzzle'
      },
      {
        name: 'قائمة السائقين',
        url: '/base/قائمة السائقين',
        icon: 'icon-puzzle'
      },

      {
        name: 'قائمة الاضرار البدنية',
        url: '/base/قائمة الاضرار البدنية',
        icon: 'icon-puzzle'
      },
      {
        name: 'قائمة الاضرار المادية',
        url: '/base/قائمة الاضرار المادية',
        icon: 'icon-puzzle'
      },
       {
        name: 'قائمة المباني',
        url: '/base/قائمة المباني',
        icon: 'icon-puzzle'
      },
       {
        name: 'قائمة المستودع',
        url: '/base/قائمة المستودع',
        icon: 'icon-puzzle'
      },
       {
        name: 'قائمة الاقاليم',
        url: '/base/قائمة الاقاليم',
        icon: 'icon-puzzle'
      },
      {
        name: 'قائمة المواقع',
        url: '/base/قائمة المواقع',
        icon: 'icon-puzzle'
      },
     {
        name: 'قائمة الخطوط',
        url: '/base/قائمة الخط',
        icon: 'icon-puzzle'
      },
      {
        name: 'تقاريرحادث شغل',
        url: '/base/تقرير شغل',
        icon: 'icon-puzzle'
      },
      {
        name: 'تقاريرحادث مرور',
        url: '/base/تقرير مرور',
        icon: 'icon-puzzle'
      },
      {
        name: 'تقاريرحادث طريق',
        url: '/base/تقرير طريق',
        icon: 'icon-puzzle'
      },
      {
        name: 'قائمة القباض',
        url: '/base/receveur',
        icon: 'icon-pencil',
      },
      {
        name: 'قائمة المحاضر',
        url: '/base/قائمة محضر',
        icon: 'icon-pencil',
      },
      {
        name: 'قائمة مصادر الاعلام',
        url: '/base/قائمةاعلام',
        icon: 'icon-pencil',
      },
       {
        name: 'قائمة الحافلات',
        url: '/base/قائمةحافلات',
        icon: 'icon-pencil',
      },
       {
        name: ' قائمة المترو',
        url: '/base/قائمةمترو',
        icon: 'icon-pencil',
      },
       {
        name: 'قائمة القطارات',
        url: '/base/قائمةقطارات',
        icon: 'icon-pencil',
      },
       
        {
        name: 'قائمة الضحايا',
        url: '/base/قائمةضحايا',
        icon: 'icon-pencil',
      },

      {
        name: 'google',
        url: '/base/googlemap',
        icon: 'icon-puzzle'
      }
      
    ]
  },
  {
    name: 'الاحصاءات',
    url: '/الاحصاءات',
    icon: 'icon-pie-chart'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'التجهبزات',
  },
  {
    name: ' مطافئ حريق',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'تسجيل مطفأة حريق ',
        url: '/base/تسجيل_مطفأة',
        icon: 'icon-star'
      },
      {
        name: 'متابعة مطفأة حريق',
        url: '/base/متابعة_مطفأة',
        icon: 'icon-star'
      }
    ]
  }
];
