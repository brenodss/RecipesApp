import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(Component, props, Provider) {
  const history = createMemoryHistory();
  if (Provider) {
    const returnFromRender = render(
      <Router history={ history }>
        <Provider>
          <Component history={ history } { ...props } />
        </Provider>
      </Router>,
    );
    return { history, ...returnFromRender };
  }
  const returnFromRender = render(
    <Router history={ history }>
      <Component history={ history } { ...props } />
    </Router>,
  );
  return { history, ...returnFromRender };
}

export default renderWithRouter;
