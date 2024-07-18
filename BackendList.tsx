// Le paramétrage concernant les URLs par défaut utilisés par l'application a été transformé sous la forme suivante pour
// pouvoir accepter plusieurs festivals ou pouvoir rentrer une IP personnalisée pour le débug (Autre). 
// Laisser la valeur de l'option "Autre" vide pour que le champ "url" aparaisse. 
export const urlConfigData = [
    { label: 'Paléo', value: 'https://runeo.paleo.ch/api' },
    { label: 'Paléo staging', value: 'https://ec2-3-209-53-110.compute-1.amazonaws.com/api' },
    { label: 'local', value: 'http://localhost:8000/api' },
    { label: 'Eurockéennes', value: 'https://runeurock.eurockeennes.fr/api' },
    { label: 'Autre', value: '' }
  ];