export const FORMS = [
  {
    slug: 'test',
    title: 'Тест',
    webhook: 'WEBHOOK_TEST',
    color: 0x4aff8a,
    description: 'Тестовая форма для проверки системы отправки.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true, placeholder: 'Иван Иванов | 12345' },
      { name: 'reason', label: 'Причина / Ссылка на работу', type: 'textarea', required: true },
      { name: 'department', label: 'Ваш отдел', type: 'select', required: true, options: ['SAI', 'K-9', 'BFG', 'DSN'] },
    ],
  },

  {
    slug: 'employment',
    title: 'Трудоустройство',
    webhook: 'WEBHOOK_EMPLOYMENT',
    color: 0x4aff8a,
    description: 'Заявка на трудоустройство в Департамент Шерифа.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'ageIC', label: 'Возраст (IC)', type: 'text', required: true, placeholder: '25' },
      { name: 'experience', label: 'Опыт работы', type: 'textarea', required: true },
      { name: 'medCert', label: 'Фото мед. справок', type: 'text', required: true, hint: 'Ссылка на изображение' },
      { name: 'militaryId', label: 'Фото военного билета', type: 'text', required: true, hint: 'Ссылка на изображение' },
      { name: 'passport', label: 'Фото паспорта', type: 'text', required: true, hint: 'Ссылка на изображение' },
      { name: 'licenses', label: 'Лицензии', type: 'textarea', required: false },
    ],
  },

  {
    slug: 'upreq',
    title: 'Запрос на повышение',
    webhook: 'WEBHOOK_UPREQ',
    color: 0xffb02e,
    description: 'Подаётся при наличии одобренного отчёта.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'reportLink', label: 'Ссылка на одобренный отчёт', type: 'text', required: true, hint: 'Ссылка на сообщение в Discord' },
    ],
  },

  {
    slug: 'reportot',
    title: 'Отчёт на повышение в отделах',
    webhook: 'WEBHOOK_REPORTOT',
    color: 0x5fe8ff,
    description: 'Отчёт о проделанной работе в вашем отделе.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'department', label: 'Отдел', type: 'select', required: true, options: ['SAI', 'K-9', 'BFG', 'DSN'] },
      { name: 'workLinks', label: 'Ссылки на проделанную работу', type: 'textarea', required: true, placeholder: 'Одна ссылка на строку' },
    ],
  },

  {
    slug: 'leave',
    title: 'Заявление на увольнение',
    webhook: 'WEBHOOK_LEAVE',
    color: 0xff5a4a,
    description: 'Добровольное увольнение из Департамента.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'reason', label: 'Причина увольнения', type: 'textarea', required: false, placeholder: 'Необязательно' },
    ],
  },

  {
    slug: 'transf',
    title: 'Перевод в LCSD',
    webhook: 'WEBHOOK_TRANSF',
    color: 0xe8c547,
    description: 'Перевод из другого ведомства в Департамент Шерифа.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'from', label: 'Откуда перевод', type: 'select', required: true, options: ['FIB', 'EMS', 'LSPD', 'GOV'] },
      { name: 'approval', label: 'Одобрение начальства (скрин)', type: 'text', required: true, hint: 'Ссылка на скриншот' },
    ],
  },

  {
    slug: 'backup',
    title: 'Восстановление',
    webhook: 'WEBHOOK_BACKUP',
    color: 0xd4af37,
    description: 'Заявка на восстановление в State Fractions.',
    fields: [
      { name: 'nameStatic', label: 'Имя Фамилия | Статик', type: 'text', required: true },
      { name: 'approval', label: 'Одобрение восстановления в State Fractions', type: 'text', required: true, hint: 'Ссылка на скриншот' },
      { name: 'banned', label: 'Уволены после Warn/BAN?', type: 'select', required: true, options: ['После BAN', 'После WARN', 'Нет'] },
    ],
  },
];

export function getFormBySlug(slug) {
  return FORMS.find((f) => f.slug === slug) || null;
}
