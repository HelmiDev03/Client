const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

export default inDevEnvironment;