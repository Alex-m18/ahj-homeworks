const eventMessages = {
  types: [
    'action',
    'freekick',
    'goal',
  ],
  messages: [
    { type: 'action', message: 'Идёт перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать' },
    { type: 'action', message: 'Отдан пас на левый фланг' },
    { type: 'action', message: 'Отдан пас на правый фланг' },
    { type: 'action', message: 'Мяч перешел к противнику' },
    { type: 'action', message: 'Мы потеряли мяч' },
    { type: 'action', message: 'Наши захватили преимущество' },
    { type: 'action', message: 'Мяч наш!' },
    { type: 'action', message: 'Опасный маневр!' },
    { type: 'action', message: 'Атакуем по центру!' },
    { type: 'action', message: 'Отразили удар по нашим воротам' },
    { type: 'freekick', message: 'Нарушение правил, Будет назначен штрафной удар' },
    { type: 'freekick', message: 'Назначен угловой' },
    { type: 'freekick', message: 'Ну за такое конечно пенальти!' },
    { type: 'freekick', message: 'Судью на мыло! Назначен штрафной по нашим воротам' },
    { type: 'freekick', message: 'Желтая карточка у гостей' },
    { type: 'freekick', message: 'Горчичник у нас' },
    { type: 'freekick', message: 'Удаление!! Ура!' },
    { type: 'freekick', message: 'Красная карточка' },
    { type: 'goal', message: 'Отличный удар! И Г-О-О-О-О-Л!!!' },
    { type: 'goal', message: 'Нашим опять забили! :(' },
  ],
};

module.exports = eventMessages;
