import { DateformatPipe } from './dateformat.pipe';

describe('DateformatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateformatPipe();
    expect(pipe).toBeTruthy();
  });

  it('create a date format pipe which format date', () => {
    const pipe = new DateformatPipe();
    expect(pipe.transform("2022-10-01T09:02:48.572Z")).toEqual("1 October 2022 Time: 14:32");
  });
});
