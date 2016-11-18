import { IslandToursPage } from './app.po';

describe('island-tours App', function() {
  let page: IslandToursPage;

  beforeEach(() => {
    page = new IslandToursPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
