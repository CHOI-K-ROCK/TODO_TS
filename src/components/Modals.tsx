import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TwoBtnModal from './Modals/Modal';

const Container = styled.section``;

function Modals(): JSX.Element {
  const modalsSlice = useSelector(
    (state: { modalsSlice: { isOpen: boolean; name: string } }) => {
      return state.modalsSlice;
    }
  );

  console.log(modalsSlice);
  return (
    <Container>
      <div>Modals</div>
      {modalsSlice.isOpen && modalsSlice.name && (
        <TwoBtnModal
          applyFn={() => console.log('apply')}
          dismissFn={() => console.log('dismiss')}
          type="double"
        />
      )}
    </Container>
  );
}

export default Modals;
