# react-simple-linkify
A simple React library for parsing text with urls to make them clickable or customized via React components

## Installation

```
yarn react-simple-linkify
```

or

```
npm install react-simple-linkify
```

## Usage

### Importing

As React component
```javascript
import Linkify from 'react-simple-linkify';
```

As function

```javascript
import { linkify } from 'react-simple-linkify';
```

Using as React component is a better way because `Linkify` component is memoized.

## Linkifying

```javascript
<Linkify>
    Some useful description: https://github.com/yurkagon/react-simple-linkify.
    
    That is an youtube video:
    https://www.youtube.com/watch?v=9NSzl8DtdM4
</Linkify>
```

or 

```javascript
linkify(`
    Some useful description: https://github.com/yurkagon/react-simple-linkify.
    
    That is an youtube video:
    https://www.youtube.com/watch?v=9NSzl8DtdM4
`);

```

Renders to:

```javascript
Some useful description: <a href="https://github.com/yurkagon/react-simple-linkify">https://github.com/yurkagon/react-simple-linkify</a>.

That is an youtube video:
<a href="https://www.youtube.com/watch?v=9NSzl8DtdM4">https://www.youtube.com/watch?v=9NSzl8DtdM4</a>
```

### Using custom React components

Let's write some url enhancer:
```javascript
const UrlEnhancer = (props) => {
    const { url } = props;
    
    if (isYouTubeUrl(url)) {
        return (
            <YouTubePlayer url={url} />
        );
    }
    
    return (
        <a href={url} rel="noopener noreferrer" target="_blank">
            {url}
        </a>
    );
}
```

And let's use it:
```javascript
<Linkify component={UrlEnhancer}>
    Some useful description: https://github.com/yurkagon/react-simple-linkify.
    
    That is an youtube video:
    https://www.youtube.com/watch?v=9NSzl8DtdM4
</Linkify>
```

or

```javascript
linkify(`
    Some useful description: https://github.com/yurkagon/react-simple-linkify.
    
    That is an youtube video:
    https://www.youtube.com/watch?v=9NSzl8DtdM4
`, UrlEnhancer);
```

Renders to:

```javascript
Some useful description: <a href="https://github.com/yurkagon/react-simple-linkify" rel="noopener noreferrer" target="_blank">https://github.com/yurkagon/react-simple-linkify</a>.

That is an youtube video:
{/* shallow render of mocked component */}
<YouTubePlayer url="https://www.youtube.com/watch?v=9NSzl8DtdM4" />
```


## Prop types

```javascript
Linkify.propTypes = {
  children: PropTypes.string.isRequired,
  component: PropTypes.func
};
```
