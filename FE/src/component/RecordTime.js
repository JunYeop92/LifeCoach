export default function RecordTime($target) {
    this.constructor = () => {
        test();
    };
    this.setState = () => {};
    this.render = () => {};

    this.constructor();
}

const test = () => {
    console.log('test');
};
