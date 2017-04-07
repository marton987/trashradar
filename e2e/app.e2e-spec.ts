import { TrSitePage } from './app.po';

describe('tr-site App', function() {
  let page: TrSitePage;

  beforeEach(() => {
    page = new TrSitePage();
  });

  it('should display message saying Trash Radar', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Trash Radar');
  });
});
