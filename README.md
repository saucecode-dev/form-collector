# Form Collector
Gather form input data from inputs, textarea and select elements.
Support for grouping via fieldset might be added in the future.

You can read about HTMLFormElement and HTMLFormElement.elements in the links below.

* [HTMLFormElements (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)
* [HTMLFormElements.elements (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements)


## Features

* [Modern JavaScript](https://github.com/JeffreyWay/laravel-mix/tree/master/docs) with Webpack, Yarn and Babel etc.
* [Webpack](https://webpack.github.io/) for compiling assets, concatenating and minifying files.
* Does NOT use jQuery.

## Usage

```html
    <!-- Do not do this... -->

    <input name="bad-example-1[key1]">
    <input name="bad-example-1[key1]"> <!-- this will overwrite the first -->
    <input name="bad-example-1[key1]"> <!-- this will overwrite the second -->
```

```javascript
    /**
     * Import class 
     */
    import { FormCollector } from '@saucecode/form-collector';

    /**
     * WRONG 
     * 
     * Do no do this, FormCollector requires a single HTMLFormElement
     * FormCollector uses HTMLFormElement.elements to gather the data!
     */
    let forms = document.querySelectorAll('your-form-selector');
    
    /**
     * CORRECT
     * 
     * FormCollector takes 1 argment and that argument should be a HTMLFormElement.
     */
    let form = document.querySelector('your-form-selector');
    let collection = new FormCollector(form);
    
    // Do whatever with data.
```

### More examples

<details><summary>Example #1</summary>
<p>

```html
<form id="example-1">
    <input name="example-1[]" value="value1">
    <input name="example-1[]" value="value2">
    <input name="example-1[]" value="value3">
    <input name="example-1[]" value="value4">
</form>
```

```javascript
    let form = document.querySelector('#example-1');
    let collection = new FormCollector(form);
    
    console.log(collection);
    
    // Should print
    // 
    // {
    //     "example-1": [
    //         "value1", 
    //         "value2", 
    //         "value3", 
    //         "value4"
    //     ]
    // }
```

</p>
</details>


<details><summary>Example #2</summary>
<p>

```html
<form id="example-2">
    <input name="example-1" value="value1">
    <input name="example-2" value="value2">
    <input name="example-3" value="value3">
    <input name="example-4" value="value4">
</form>
```

```javascript
    let form = document.querySelector('#example-2');
    let collection = new FormCollector(form);
    
    console.log(collection);
    
    // Should print
    // 
    // {
    //     "example-1": "value1",
    //     "example-2": "value2",
    //     "example-3": "value3",
    //     "example-4": "value4",
    // }
```

</p>
</details>


<details><summary>Example #3</summary>
<p>

```html
<form id="example-3">
    <input name="example-3[key1]" value="value1">
    <input name="example-3[key2]" value="value2">
    <input name="example-3[key3]" value="value3">
    <input name="example-3[key4]" value="value4">
</form>
```

```javascript
    let form = document.querySelector('#example-3');
    let collection = new FormCollector(form);
    
    console.log(collection);
    
    // Should print
    // 
    // {
    //     "example-3": {
    //         key1: "value1", 
    //         key2: "value2", 
    //         key3: "value3", 
    //         key4: "value4"
    //     }
    // }
```

</p>
</details>


<details><summary>Example #4</summary>
<p>

```html
<form id="example-4">
    <input name="example-4[key1][]" value="value1">
    <input name="example-4[key1][]" value="value2">
    <input name="example-4[key2][]" value="value3">
    <input name="example-4[key2][]" value="value4">
</form>
```

```javascript
    let form = document.querySelector('#example-4');
    let collection = new FormCollector(form);
    
    console.log(collection);
    
    // Should print
    // 
    // {
    //     "example-4": {
    //         key1: [
    //             "value1",
    //             "value2"
    //         ],
    //         key2: [
    //             "value3",
    //             "value4"
    //         ]
    //     }
    // }
```

</p>
</details>


<details><summary>Example #5 (all combined)</summary>
<p>

```html
<form id="example-5">
    <div>
        <input name="example-1" value="value1">
        <input name="example-2" value="value2">
        <input name="example-3" value="value3">
        <input name="example-4" value="value4">
    </div>
    
    <div>
        <input name="example-5[]" value="value1">
        <input name="example-5[]" value="value2">
        <input name="example-5[]" value="value3">
        <input name="example-5[]" value="value4">
    </div>

    <div>
        <input name="example-6[key1]" value="value1">
        <input name="example-6[key2]" value="value2">
        <input name="example-6[key3]" value="value3">
        <input name="example-6[key4]" value="value4">
    </div>
    
    <div>
        <input name="example-7[key1][]" value="value1">
        <input name="example-7[key1][]" value="value2">
        <input name="example-7[key2][]" value="value3">
        <input name="example-7[key2][]" value="value4">
    </div>
</form>
```

```javascript
    let form = document.querySelector('#example-5');
    let collection = new FormCollector(form);
    
    console.log(collection);
    
    // Should print
    // 
    // {
    //     "example-1": "value1",
    //     "example-2": "value2",
    //     "example-3": "value3",
    //     "example-4": "value4",
    //     "example-5": [
    //         "value1", 
    //         "value2", 
    //         "value3", 
    //         "value4"
    //     ]
    //     "example-6": {
    //         key1: "value1", 
    //         key2: "value2", 
    //         key3: "value3", 
    //         key4: "value4"
    //     }
    //     "example-7": {
    //         key1: [
    //             "value1",
    //             "value2"
    //         ],
    //         key2: [
    //             "value3",
    //             "value4"
    //         ]
    //     }
    // }
```

</p>
</details>
