const configurationResource = Vue.resource("/configuration");
const newGameResource = Vue.resource('/new-game');
const evolveResource = Vue.resource('/evolve');
const gridResource = Vue.resource('/grid');

Vue.component('navbar', {
    props: [
        'configurationHidden', 'selectedCellStateIndex', 'colors', 'setSelectedCellStateIndexMethod',
        'toggleConfigurationMethod', 'newGameMethod', 'evolveMethod',
        'timerToggleMethod', 'timerStarted', 'zoomInMethod',
        'zoomOutMethod'
    ],
    data: function() {
        return {
            playing: this.timerStarted,
            configurationHidden0: this.configurationHidden,
            selectedCellStateIndex0: this.selectedCellStateIndex
        }
    },
    watch: {
        timerStarted: function(newValue, oldValue) {
            this.playing = newValue;
        },
        configurationHidden: function(newValue) {
            this.configurationHidden0 = newValue;
        },
        selectedCellStateIndex: function(newValue) {
            this.selectedCellStateIndex0 = newValue;
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" target="blank" href="#">
                    Game of cells
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-if="configurationHidden">
                            <button class="btn btn-outline-success" type="button" @click="newGameMethod()">New game</button>
                        </li>
                        <li class="nav-item" v-if="configurationHidden">
                            <button class="btn btn-outline-success" type="button" @click="evolveMethod()">
                                Evolve
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                </svg>
                            </button>
                        </li>
                        <li class="nav-item" v-if="configurationHidden">
                            <button class="btn btn-success" @click="timerToggleMethod()">
                                <svg :class="playing ? 'd-none' : ''" class="bi bi-play-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>
                                <svg :class="!playing ? 'd-none' : ''" class="bi bi-pause-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                                </svg>
                            </button>
                        </li>
                        <li class="nav-item" v-if="configurationHidden">
                            <div class="btn-group">
                                <button class="btn btn-outline-info" type="button" @click="zoomInMethod()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                                        <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </button>
                                <button class="btn btn-outline-info" type="button" @click="zoomOutMethod()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-out" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
                                        <path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li class="nav-item" v-if="configurationHidden">
                            <select class="form-select" :style="'background: ' + colors[selectedCellStateIndex]" v-model="selectedCellStateIndex0"
                                @change="setSelectedCellStateIndexMethod(selectedCellStateIndex0)">
                                <option :value="index" v-for="(color, index) of colors" :style="'background: ' + color"></option>
                            </select>
                        </li>

                        <li class="nav-item" v-if="!configurationHidden">
                            <button class="btn btn-success" type="button" @click="toggleConfigurationMethod()">Hide configuration</button>
                        </li>
                        <li class="nav-item" v-if="configurationHidden">
                            <button class="btn btn-success" type="button" @click="toggleConfigurationMethod()">ShowConfiguration</button>
                        </li>
                    </ul>

                    <div class="navbar-text">
                        <a target="blank" href="https://github.com/Camper689/game-of-cells">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z" fill="#24292E"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `
});

Vue.component('canvas-grid', {
    props: ['colors', 'scale', 'grid', 'offset', 'size', 'getCanvasContextMethod'],
    data: function() {
        return {
            context: undefined,
            grid0: this.grid,
            colors0: this.colors,
            offset0: this.offset,
            size0: this.size
        }
    },
    mounted: function() {
        this.refreshContext();
    },
    methods: {
        refreshContext: function() {
            this.context = this.getCanvasContextMethod('grid');
            this.draw();
        },
        getColorFromIndex: function(index) {
            return this.colors0[index];
        },
        draw: function() {
            if(!this.grid0) return;

            var prevColor = '';
            var topOffset = this.offset0;
            var leftOffset = 0;

            for(var rowIndex = 0; rowIndex < this.grid0.length; rowIndex++) {
                const row = this.grid0[rowIndex];
                leftOffset = 0 + this.offset0;

                for(var elemIndex = 0; elemIndex < row.length; elemIndex++) {
                    const elem = row[elemIndex];

                    const color = this.getColorFromIndex(elem);
                    if(prevColor != color) {
                        prevColor = color;
                        this.context.fillStyle = color;
                    }

                    this.context.fillRect(leftOffset, topOffset, this.size0, this.size0);
                    leftOffset += this.size0 + this.offset0;
                }
                topOffset += this.size0 + this.offset0;
            }
        }
    },
    watch: {
        scale: function(newValue, oldValue) {
            this.refreshContext();
        },
        grid: function(newValue, oldValue) {
            this.grid0 = newValue;
            this.draw();
        },
        colors: function(newValue, oldValue) {
            this.colors0 = newValue;
            this.draw();
        },
        offset: function(newValue, oldValue) {
            this.offset0 = newValue;
            this.draw();
        },
        size: function(newValue, oldValue) {
            this.size0 = newValue;
            this.draw();
        }
    },
    template: `
        <canvas id="grid"></canvas>
    `
});

Vue.component('canvas-hover', {
    props: ['size', 'offset', 'scale', 'grid', 'getCanvasContextMethod', 'putCellMethod'],
    data: function() {
        return {
            hoverRow: -1,
            hoverIndex: -1,
            grid0: this.grid,
            context: undefined,
            mouseClicked: false
        }
    },
    watch: {
        grid: function(newValue, oldValue) {
            this.grid0 = newValue;
        },
        scale: function(newValue, oldValue) {
            this.refreshContext();
        }
    },
    mounted: function() {
        this.refreshContext();
    },
    methods: {
        refreshContext: function() {
            this.context = this.getCanvasContextMethod('hover');
            this.draw();
        },
        onHover: function() {
            if(!this.grid) return;

            const rect = event.target.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const previousHoverRow = this.hoverRow;
            const previousHoverIndex = this.hoverIndex;

            const rectSize = (this.size + this.offset) / this.scale;
            var topOffset;

            for(var rowIndex = 0; rowIndex < this.grid0.length; rowIndex++) {
                topOffset = rowIndex * rectSize;

                if(mouseY >= topOffset && mouseY <= topOffset + rectSize) {
                    this.hoverRow = rowIndex;

                    const row = this.grid0[rowIndex];
                    for(var index = 0; index < row.length; index++) {
                        var leftOffset = index * rectSize;
                        if(mouseX >= leftOffset && mouseX <= leftOffset + rectSize) {
                            this.hoverIndex = index;
                            break;
                        }
                    }

                    break;
                }
            }

            if(this.hoverIndex != -1 && (
                previousHoverRow != this.hoverRow || previousHoverIndex != this.hoverIndex
            )) this.draw();

            if(this.mouseClicked)
                this.putCellMethod(this.hoverIndex, this.hoverRow);
        },
        draw: function() {
            const left = this.hoverIndex * (this.size + this.offset) + this.offset;
            const top = this.hoverRow * (this.size + this.offset) + this.offset;

            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.context.fillStyle = 'yellow';
            this.context.fillRect(left, top, this.size, this.size);
        },
        updateMouseClickedState: function() {
            var flags = event.buttons !== undefined ? event.buttons : event.which;
            this.mouseClicked = (flags & 1) === 1;
        }
    },
    template: `
        <canvas id="hover"
            @mousedown="updateMouseClickedState()" @mouseup="updateMouseClickedState()"
            @mousemove="onHover()" @click="putCellMethod(hoverIndex, hoverRow)"
        ></canvas>
    `
});

Vue.component('canvas-parent', {
    props: ['colors', 'scale', 'size', 'grid', 'visible', 'putCellMethod'],
    data: function() {
        return {
            isVisible: this.visible
        }
    },
    methods: {
        getCanvasContext: function(elemId) {
            const canvas = document.getElementById(elemId);
            const ctx = canvas.getContext('2d');

            canvas.width = canvas.offsetWidth * this.scale;
            canvas.height = canvas.offsetHeight * this.scale;

            return ctx;
        }
    },
    watch: {
        visible: function(newValue, oldValue) {
            this.isVisible = newValue;
        }
        /*
        _config: {
            handler(newValue) {
                this.config = newValue;
            },
            deep: true
        }
        */
    },
    template: `
        <div class="h-100 w-100" :class="isVisible ? '' : 'd-none'" style="position: relative">
            <canvas-hover :scale="scale" :size="size" :offset="0" :grid="grid" :getCanvasContextMethod="getCanvasContext" :putCellMethod="putCellMethod" />
            <canvas-grid
                :colors="colors" :scale="scale" :size="size"
                :offset="0" :grid="grid" :getCanvasContextMethod="getCanvasContext"
            />
        </div>
    `
});

Vue.component('configuration', {
    props: ['config', 'visible', 'onChangeMethod', 'colors', 'updateColorsMethod', 'resetColorsMethod'],
    data: function() {
        return {
            isVisible: this.visible,
            yaml: this.readConfigToYaml(this.config),
            colors0: [],
            states: undefined,
            thereWasChanges: false,
            errorMessage: '',
            colorsHidden: true
        }
    },
    created: function() {
        this.states = this.config.states;
        for(var color of this.colors) {
            this.colors0.push(color);
        }
    },
    methods: {
        readYamlToObject(yaml) {
            // TODO: refactor this method
            const stack = [];
            const lines = yaml.split("\n").reverse();

            for(var line of lines) {
                if(!line.trim().length) continue;

                const match = new RegExp("[\t ]+").exec(line);
                const symbolCountArray = match ? match[0].split('').map(symbol => symbol == '\t' ? 4 : 1) : [];
                var nesting = 0;
                for(var count of symbolCountArray) {
                    nesting += count;
                }

                line = line.trim()

                var key, value, isArrayValue = false;
                if(line.includes(":")) {
                    key = line.split(":")[0];
                    value = line.substring(line.indexOf(":") + 1).trim();
                } else {
                    key = '';
                    value = line.substring(line.indexOf('-') + 1).trim();
                    isArrayValue = true;
                }

                if(value == "") {
                    var obj = {}, arr = [], isArray = false;

                    while(stack.length && stack[0].nesting > nesting) {
                        const firstValue = stack.shift();
                        if(firstValue.isArrayValue) {
                            isArray = true;
                            arr.push(firstValue.value);
                        } else {
                            obj[firstValue.key] = firstValue.value;
                        }
                    }

                    value = isArray ? arr : obj;
                }

                stack.unshift({nesting, key, value, isArrayValue});
            }

            console.log(stack);
            var result = {};
            for(var stackObj of stack) {
                result[stackObj.key] = stackObj.value;
            }

            console.log(result);

            return result;
        },
        readConfigToYaml(config) {
            var yaml = '';
            var stateIndex = 1;
            for(var state of config.states) {
                const stateName = config.defaultStateName == state.name ? 'default-state' : ('state-' + stateIndex++);
                yaml += stateName + ":\n\t";
                yaml += "name: " + state.name + "\n\t";
                yaml += "transitions:" + "\n\t\t";
                var transitionIndex = 1;
                for(var transition of state.transitions) {
                    yaml += " - "+ transition.condition + " => " + transition.newStateName + "\n\t\t";
                }

                yaml += "\n";
            }

            return yaml;
        },
        onYamlChange: function() {
            this.thereWasChanges = true;
        },
        reset: function() {
            this.yaml = this.readConfigToYaml(this.config);
            this.thereWasChanges = false;
        },
        error(message) {
            this.errorMessage = message;
            this.thereWasChanges = false;
        },
        save: function() {
            this.error('');

            const yamlAsJSON = this.readYamlToObject(this.yaml);
            if(!yamlAsJSON["default-state"] || !yamlAsJSON['default-state'].name) {
                return this.error("At least one of cell state sections must be named 'default-state'");
            }

            var states = [];
            for(var key of Object.keys(yamlAsJSON)) {
                const state = yamlAsJSON[key];

                const name = state.name;
                if(!name) {
                    return this.error(key + " has no name");
                }

                if(states.filter(s => s.name == name).length) {
                    return this.error("There is two states with the same name " + name);
                }

                const transitions = [];
                if(state.transitions) {
                    for(var transition of state.transitions) {
                        if(!transition.includes("=>")) {
                            return this.error("There is no => symbol in transition");
                        }

                        const condition = transition.substring(0, transition.indexOf('=>')).trim();
                        if(!condition) {
                            return this.error("There is no condition in transition " + transitionKey);
                        }

                        const become = transition.substring(transition.indexOf("=>") + 2).trim();
                        if(!become) {
                            return this.error("There is no name of new state in transition");
                        }

                        transitions.push({
                            "condition": condition,
                            "newStateName": become
                        });
                    }
                }

                states.push({name, transitions});
            }

            var newConfig = {
                defaultStateName: yamlAsJSON['default-state'].name,
                states: states
            };

            this.onChangeMethod(newConfig);
        },
        setColor(index) {
            console.log(index);
        }
    },
    watch: {
        visible: function(newValue, oldValue) {
            this.isVisible = newValue;
        },
        config: {
            handler(newValue) {
                this.yaml = this.readConfigToYaml(newValue);
                this.states = newValue.states;

                while(this.colors0.length < this.states.length) {
                    this.colors0.push('#0000FF');
                }
            },
            deep: true
        },
        colors: function(newValue) {
            this.colors0 = newValue;
        }
    },
    template: `
        <div class="h-100 w-100 bg-white p-3 rounded container-fluid" :class="visible ? '' : 'd-none'">
            <div class="h-100" :class="!colorsHidden ? 'd-none' : ''">
                <div class="row bg-light p-3 rounded">
                    <div class="col">
                        <h4 class="card-title">&nbsp;Enter your configuration here: </h4>
                        <h5 class="text-danger">{{errorMessage}}</h5>
                    </div>
                    <div class="col-auto ml-auto">
                        <button class="btn btn-primary" @click="colorsHidden = false">Change colors</button>
                        <button class="btn btn-danger" @click="reset">Reset</button>
                        <button class="btn btn-success" @click="save" v-if="thereWasChanges">Save</button>
                    </div>
                </div>

                <textarea v-model="yaml" class="form-control height-fill" @input="onYamlChange"></textarea>
            </div>

            <div class="h-100" :class="colorsHidden ? 'd-none' : ''">
                <div class="row bg-light p-3 rounded">
                    <div class="col">
                        <h4 class="card-title">&nbsp;Edit cell colors:</h4>
                    </div>
                    <div class="col-auto ml-auto">
                        <button class="btn btn-primary" @click="colorsHidden = true">Change configuration</button>
                        <button class="btn btn-danger" @click="resetColorsMethod">Reset to default</button>
                    </div>
                </div>

                <div class="card-deck mt-2">
                    <div class="card mt-2" v-for="(state, index) of states">
                        <div class="card-body">
                            <div class="card-text p-2">
                                <span class="lead">{{state.name}}: </span>
                                <input type="color" v-model="colors0[index]" @change="updateColorsMethod(colors0)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

Vue.component('game-of-life-app', {
    data: function() {
        return {
            colors: this.readFromLocalStorage("colors", '#808080,#FFDAB9,#8A2BE2,#D2691E,#00FF00,#C87064').split(','),
            selectedCellStateIndex: 0,
            config: undefined,
            grid: undefined,
            replaces: undefined,
            configurationHidden: true,
            timerStarted: false,
            scale: Number.parseFloat(this.readFromLocalStorage("scale", 1.2)),
            size: 10
        }
    },
    created: function() {
        configurationResource.get()
                .then(response => response.json().then(
                    config => {
                        this.config = config;
                        this.calculateSelectedCellStateIndex();
                    }
                ));

        this.update();

        setInterval(this.timerTick, 500);
    },
    methods: {
        readFromLocalStorage: function(name, defaultValue) {
            return localStorage.getItem(name) || defaultValue;
        },
        saveInLocalStorage: function(name, value) {
            localStorage.setItem(name, value);
        },
        calculateSelectedCellStateIndex: function() {
            this.selectedCellStateIndex = 0;

            for(var index = 0; index < this.config.states.length; index++) {
                if(this.config.states[index].name != this.config.defaultStateName) {
                    this.selectedCellStateIndex = index;
                    return;
                }
            }
        },
        setSelectedCellStateIndex: function(newIndex) {
            this.selectedCellStateIndex = newIndex;
        },
        toggleConfiguration: function() {
            this.configurationHidden = !this.configurationHidden;
        },
        timerToggle: function() {
            this.timerStarted = !this.timerStarted;
        },
        newGame: function() {
            newGameResource
                .save({grid: {width: 100, height: 100}, configuration: this.config})
                .then(res => this.update());
        },
        loadGridFromResponse: function(gridData) {
            this.grid = gridData.grid;
            this.replaces = gridData.replaces;
        },
        update: function() {
            gridResource.get()
                .then(res => res.json().then(
                    gridData => this.loadGridFromResponse(gridData)
                ));
        },
        evolve: function() {
            evolveResource.save({})
                .then(res => res.json().then(
                    gridData => this.loadGridFromResponse(gridData)
                ));
        },
        putCell: function(x, y) {
            console.log("Put cell", x, y)
            if(x == -1) return;
            const current = this.grid[y][x];
            if(current != this.selectedCellStateIndex) {
                Vue.resource("/add/" + x + "/" + y + "/" + this.config.states[this.selectedCellStateIndex].name).update({});
                this.grid[y].splice(x, 1, this.selectedCellStateIndex);
            }
        },
        timerTick: function() {
            if(this.timerStarted)
                this.evolve();
        },
        zoomIn: function() {
            if(this.scale < 0.5) return;
            this.scale -= 0.1;
            this.saveInLocalStorage("scale", this.scale);
        },
        zoomOut: function() {
            if(this.scale > 3) return;
            this.scale += 0.1;
            this.saveInLocalStorage("scale", this.scale);
        },
        updateConfig: function(newConfig) {
            this.config = newConfig;
            this.calculateSelectedCellStateIndex();

            this.newGame();
        },
        updateColors: function(newColors) {
            this.colors = newColors;
            this.saveInLocalStorage("colors", this.colors.join(','));
        },
        resetColors: function() {
            this.updateColors(['#808080', '#FFDAB9', '#8A2BE2', '#D2691E', '#00FF00', '#C87064']);
        }
    },
    template: `
        <div class="container-fluid h-100 mt-2">
            <navbar
                :configurationHidden="configurationHidden"
                :selectedCellStateIndex="selectedCellStateIndex"
                :colors="colors"
                :setSelectedCellStateIndexMethod="setSelectedCellStateIndex"
                :toggleConfigurationMethod="toggleConfiguration"
                :newGameMethod="newGame"
                :evolveMethod="evolve"
                :timerToggleMethod="timerToggle"
                :timerStarted="timerStarted"
                :zoomInMethod="zoomIn"
                :zoomOutMethod="zoomOut"
            />
            <configuration
                v-if="config"
                :config="config"
                :colors="colors"
                :visible="!configurationHidden"
                :onChangeMethod="updateConfig"
                :updateColorsMethod="updateColors"
                :resetColorsMethod="resetColors"
            />
            <canvas-parent
                :colors="colors"
                :scale="scale"
                :size="size"
                :grid="grid"
                :visible="configurationHidden"
                :putCellMethod="putCell"
            />
        </div>
    `
});

var app = new Vue({
    el: '#app',
    template: '<game-of-life-app />',
});