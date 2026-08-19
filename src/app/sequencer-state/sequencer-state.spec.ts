import { TestBed } from '@angular/core/testing';

import { SequencerState } from './sequencer-state';

describe('SequencerState', () => {
  let service: SequencerState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequencerState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
