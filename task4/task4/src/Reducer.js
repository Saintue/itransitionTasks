export default function reducer(state, acton) {
  switch (acton.type) {
    case 'update':
      let ids = [];
      for (let i = 0; i < acton.payload.length; i++) {
        ids.push(acton.payload[i]._id);
      }

      let usersToRemove = state.filter(el => ids.includes(el._id));
      if (
        usersToRemove.find(
          el => el.email === JSON.parse(localStorage.getItem('currentUser'))
        )
      ) {
        localStorage.setItem('currentUser', JSON.stringify('none'));
        window.location.reload();
      } else {
        return state.filter(el => !ids.includes(el._id));
      }
    case 'block':
      let idsToBlock = [];
      for (let i = 0; i < acton.payload.length; i++) {
        idsToBlock.push(acton.payload[i]._id);
      }

      let usersToBlock = state.filter(el => idsToBlock.includes(el._id));
      console.log(usersToBlock);
      if (
        usersToBlock.find(
          el => el.email === JSON.parse(localStorage.getItem('currentUser'))
        )
      ) {
        localStorage.setItem('currentUser', JSON.stringify('none'));
        window.location.reload();
      } else {
        return state.map(el => {
          if (idsToBlock.includes(el._id)) {
            el.status = 'false';
          }
          return el;
        });
      }
    case 'unBlock':
      let idsToUnBlock = [];
      for (let i = 0; i < acton.payload.length; i++) {
        idsToUnBlock.push(acton.payload[i]._id);
      }
      return state.map(el => {
        if (idsToUnBlock.includes(el._id)) {
          el.status = 'true';
        }
        return el;
      });

    default:
      return state;
  }
}
