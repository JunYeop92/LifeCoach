import App from './component/App.js';

import './css/Normalize.css';
import './css/style.css';
import './css/timer.css';
import './css/todo.css';

import '@fortawesome/fontawesome-free/js/all.js';

// 라우팅
(function () {
    
    const app = new App();
    const { todo, timer } = app.component;
    const routes = {
        // path: url
        '/': todo,
        '/timer': timer,
    };
    //content 부분만 변경
    let isFirst = true;
    const $content = document.querySelector('#content');
    const render = (path) => {
        $content.innerHTML = '';
        const attachComponent = routes[path];
        if (!attachComponent) {
            $content.innerHTML = `${path} Not Found`;
            return;
        }
        
        attachComponent.attachNode({$content});
    };

    // popstate 이벤트는 history entry가 변경되면 발생한다.
    // PJAX 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
    // popstate 이벤트는 pushState에 의해 발생하지 않는다.
    // 이전페이지 / 다음페이지 button 또는 history.back() / history.go(n)에 의해 발생한다.
    window.addEventListener('popstate', (e) => {
        // e.state는 pushState 메서드의 첫번째 인수
        console.log('[popstate]', e.state);
        // 이전페이지 / 다음페이지 button이 클릭되면 render를 호출
        render(e.state.path);
    });

    // 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
    // preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실시한다.
    const navigation = document.querySelector('#navigation');
    navigation.addEventListener('click', (e) => {
        if (!e.target.matches('#navigation > div > a')) return;
        e.preventDefault();
        // 이동 페이지
        const path = e.target.getAttribute('href');

        // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
        history.pushState({ path }, null, path);
        // path에 의한 AJAX 요청
        render(path);
    });

    // 웹페이지가 처음 로딩되었을 때
    render('/');

    // 새로고침이 클릭되었을 때, 현 페이지(예를 들어 loclahost:5004/service)가 서버에 요청된다.
    // 이에 응답하는 기능이 서버 측에 추가되어야 한다.
})();
