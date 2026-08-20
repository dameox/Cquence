import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencerBody } from './sequencer-body';

describe('SequencerBody', () => {
  let component: SequencerBody;
  let fixture: ComponentFixture<SequencerBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequencerBody],
    }).compileComponents();

    fixture = TestBed.createComponent(SequencerBody);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
