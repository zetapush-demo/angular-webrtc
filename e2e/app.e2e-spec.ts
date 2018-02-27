import { AppAngularWebrtcPage } from './app.po';

describe('app-angular-webrtc App', () => {
  let page: AppAngularWebrtcPage;

  beforeEach(() => {
    page = new AppAngularWebrtcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
