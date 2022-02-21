import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import livereload from "connect-livereload";
const routes = {
  pug: {
    //다 포함시킬거면 src/**/*.pug */
    src: "src/*.pug",
    watch: "src/**/*.pug",
    dest: "build",
  },
};
const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build/"]);

//liverload 파일을 저장하면 자동으로 새로고침 해줌
const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
  // 봐야하는 파일 , 어떤 Task를 수행할 건지
  gulp.watch(routes.pug.watch, pug);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);
//두가지  task를 실행하기를 원한다면 일렬로 이렇게 적으면 됨
const postDev = gulp.series([webserver, watch]);
//이전 빌드 파일 지우고 새로 생성
export const dev = gulp.series([prepare, assets, postDev]);
