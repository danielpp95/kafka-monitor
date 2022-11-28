export const BuildProtoFileFromCSharp = (input) => {
    let message = '';
    message = addSyntax(message);
    message = getNamespace(message, input);
    // message = addBlankLine(message);
    message = message + '\n'
    
    message = GetMessageName(message, input);
    message = message + '\n{'
    message = mapProperties(message, input);
    message = message + '\n}'

    return message.trim();
}

const addSyntax = (message) => {
    return concatMessages(message, 'syntax = "proto2";');
}

const getNamespace = (message, input) => {
    const namespace = input
        .split('\n')
        .filter(x => x.includes('namespace'))[0]
        .slice(10)
    
    const messagePackage = `package ${namespace};`
    return concatMessages(message, messagePackage);
}

const addBlankLine = (message) => {
    return message + '\n'
}

const GetMessageName = (message, input) => {
    const classLine = input.split('\n').filter(x => x.includes('class'))[0];
    const className = classLine.indexOf("class")
    className = classLine.slice(11+6)

    return concatMessages(message,`message ${className}`);
}

const concatMessages = (message1, message2) => {
    if (message2.trim() === '') {
        return message1;
    }
    return message1 + '\n' + message2;
}

const mapProperties = (message, input) => {
    const classIndex = input.indexOf('public class');
    
    let properties = '';
    properties = input
        .slice(classIndex)
        .split('\n');
    properties.shift()
    properties.shift()
    properties.pop()
    properties.pop()
    console.log(properties )

    let indice = 1;
    for (let index = 0; index < properties.length; index++) {
        const property = properties[index];
        if (property.trim() === '') {
            continue;
        }

        message = concatMessages(
            message,
            mapProperty(property.trim(), indice++))
    }

    return message;
}

const mapProperty = (property, index) => {
    property = removeGetterAndSetter(property, index);
    return property
}

const removeGetterAndSetter = (property, index) => {
    if (property.endsWith('{ get; set; }')) {
        property = property.slice(0, -'{ get; set; }'.length).trim()
    }

    // add index and end line
    property = `${property} = ${index};`;

    // remove not public properties
    if (!property.startsWith('public ')) {
        return '';
    }

    // remove public word
    const publicWordEndIndex = property.indexOf(' ') ;
    property = property.slice(publicWordEndIndex).trim();

    property = mapType(property).trim();

    return `\t${property}`;
}

const mapType = (property) => {
    const typeIndex = property.indexOf(' ');
    const type = property.slice(0, typeIndex);

    const propertyWithoutType = property.substring(typeIndex).trim();
    
    if (type === 'string') {
        return `required string ${propertyWithoutType}`
    }
    if (type === 'string?') {
        return `optional string ${propertyWithoutType}`
    }
    
    if (type === 'Guid') {
        return `required string ${propertyWithoutType}`
    }
    if (type === 'Guid?') {
        return `optional string ${propertyWithoutType}`
    }

    if (type === 'int') {
        return `required int32 ${propertyWithoutType}`
    }
    if (type === 'int?') {
        return `optional int32 ${propertyWithoutType}`
    }

    if (type === 'long') {
        return `required int64 ${propertyWithoutType}`
    }
    if (type === 'long?') {
        return `optional int64 ${propertyWithoutType}`
    }

    if (type === 'DateTime') {
        return `required int64 ${propertyWithoutType}`
    }
    if (type === 'DateTime?') {
        return `optional int64 ${propertyWithoutType}`
    }

    if (type.includes('IEnumerable')) {
        const listTypeStartIndex = type.indexOf('<') + 1;
        const listTypeEndIndex = type.lastIndexOf('>');
        const listType = type.substring(listTypeStartIndex, listTypeEndIndex)
        return `repeated ${listType} ${propertyWithoutType}`
    }

    return `ERROR:: '${type}' Not supported`;
}