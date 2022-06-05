package com.cgol.coolergameoflife.condition.builder.function;

import com.cgol.coolergameoflife.cell.CellContext;
import com.cgol.coolergameoflife.condition.value.Number;
import com.cgol.coolergameoflife.condition.value.Value;

import java.util.List;
import java.util.stream.Collectors;

public class SumBuilder extends FunctionBuilder {

    public SumBuilder(String functionName) {
        super(functionName);
    }

    @Override
    protected Number buildValue(List<Value<?>> params) {
        return new Number() {
            private final List<Number> numbers = params.stream().map(value -> (Number) value).collect(Collectors.toList());

            @Override
            public Integer calculate(CellContext context) {
                return numbers.stream().mapToInt(value -> value.calculate(context)).sum();
            }

            @Override
            public String asString() {
                return functionName + "(" + numbers.stream().map(Value::asString).collect(Collectors.joining(", ")) + ")";
            }
        };
    }

}
