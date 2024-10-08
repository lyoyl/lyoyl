import { expect } from '@esm-bundle/chai';
import { fake } from 'sinon';

import { domRef } from './domRef.js';
import { html } from './html.js';
import { computed, ref, watch } from './reactive.js';
import { nextTick } from './scheduler.js';

describe('Reactive rendering', () => {
  it('render a template with a primitive reactive value', async () => {
    const counter = ref(0);
    const template = html`<div>${() => counter.value}</div>`;

    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelector('div')!.textContent).to.equal('0');
    counter.value = 100;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('100');
  });

  it('attrbute reactive rendering', async () => {
    const counter = ref(0);
    const template = html`<div data-value="${() => counter.value}"></div>`;
    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelector('div')!.getAttribute('data-value')).to.equal('0');
    counter.value = 100;
    await nextTick();
    expect(container.querySelector('div')!.getAttribute('data-value')).to.equal('100');
  });

  it('domeRef should be working as expected', async () => {
    const h1Ref = domRef();
    const cb = fake();
    watch(h1Ref, cb);

    const template = html`<h1 ${h1Ref}></h1>`;
    const container = document.createElement('div');
    template.mountTo(container);
    await nextTick();

    const h1 = container.querySelector('h1');
    expect(h1).to.be.instanceOf(HTMLHeadingElement);
    expect(cb.callCount).to.equal(1);
    expect(cb.firstCall.args[0]).to.equal(h1);
    expect(cb.firstCall.args[1]).to.equal(null);
  });

  it('conditional rendering - between 2 templates', async () => {
    const toggle = ref(true);
    const templateA = html`<p>Template A</p>`;
    const templateB = html`<p>Template B</p>`;
    const template = html`<div>${() => toggle.value ? templateA : templateB}</div>`;
    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelector('div')!.textContent).to.equal('Template A');
    toggle.value = false;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('Template B');
    toggle.value = true;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('Template A');
  });

  it('conditional rendering - between template and primitive value', async () => {
    const toggle = ref(true);
    const templateA = html`<p>Template A</p>`;
    const template = html`<div>${() => toggle.value ? templateA : 'Primitive'}</div>`;
    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelector('div')!.textContent).to.equal('Template A');
    toggle.value = false;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('Primitive');
    toggle.value = true;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('Template A');
  });

  it('a reactive value used by multiple templates', async () => {
    const counter = ref(0);
    const templateA = html`<div>${() => counter.value} - ${() => counter.value}</div>`;
    const templateB = html`<div>${() => counter.value} - ${() => counter.value}</div>`;
    const containerA = document.createElement('div');
    templateA.mountTo(containerA);
    const containerB = document.createElement('div');
    templateB.mountTo(containerB);

    expect(containerA.querySelector('div')!.textContent).to.equal('0 - 0');
    expect(containerB.querySelector('div')!.textContent).to.equal('0 - 0');
    counter.value = 100;
    await nextTick();
    expect(containerA.querySelector('div')!.textContent).to.equal('100 - 100');
    expect(containerB.querySelector('div')!.textContent).to.equal('100 - 100');
  });

  it('list rendering', async () => {
    const items = ref(['a', 'b']);
    const template = html`
      <ul>
        ${() => items.value.map(item => html`<li>${() => item}</li>`)}
      </ul>
    `;
    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelectorAll('li')).to.have.length(2);
    expect(container.querySelectorAll('li')[0].textContent).to.equal('a');
    expect(container.querySelectorAll('li')[1].textContent).to.equal('b');
    items.value = ['c', 'b', 'd'];
    await nextTick();
    expect(container.querySelectorAll('li')).to.have.length(3);
    expect(container.querySelectorAll('li')[0].textContent).to.equal('c');
    expect(container.querySelectorAll('li')[1].textContent).to.equal('b');
    expect(container.querySelectorAll('li')[2].textContent).to.equal('d');
  });

  it('list rendering with conditional rendering', async () => {
    const items = ref(['aa', 'b', 'cc', 'd']);
    const template = html`
      <ul>
        ${() =>
      items.value.map((item) => {
        return html`<li>${() => item.length % 2 === 0 ? 'Even' : 'Odd'}</li>`;
      })}
      </ul>
    `;
    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelectorAll('li')).to.have.length(4);
    expect(container.querySelectorAll('li')[0].textContent).to.equal('Even');
    expect(container.querySelectorAll('li')[1].textContent).to.equal('Odd');
    expect(container.querySelectorAll('li')[2].textContent).to.equal('Even');
    expect(container.querySelectorAll('li')[3].textContent).to.equal('Odd');

    items.value = ['aaa', 'b', 'cc', 'd', 'ee'];
    await nextTick();
    expect(container.querySelectorAll('li')).to.have.length(5);
    expect(container.querySelectorAll('li')[0].textContent).to.equal('Odd');
    expect(container.querySelectorAll('li')[1].textContent).to.equal('Odd');
    expect(container.querySelectorAll('li')[2].textContent).to.equal('Even');
    expect(container.querySelectorAll('li')[3].textContent).to.equal('Odd');
    expect(container.querySelectorAll('li')[4].textContent).to.equal('Even');
  });

  it('recursive rendering', () => {
    const treeData = ref({
      value: 0,
      children: [
        {
          value: 1,
          children: [
            {
              value: 3,
              children: [],
            },
          ],
        },
        {
          value: 2,
          children: [],
        },
      ],
    });

    function renderTree(tree: typeof treeData.value) {
      return html`
        <div>
          <span>${() => tree.value}</span>
          ${() => tree.children.map(child => renderTree(child))}
        </div>
      `;
    }

    const template = html`${() => renderTree(treeData.value)}`;
    const container = document.createElement('div');
    template.mountTo(container);
    /**
     * The tree DOM structure should look like this:
     * <div>
     *   <span>0</span>
     *   <div>
     *     <span>1</span>
     *     <div>
     *       <span>3</span>
     *     </div>
     *   </div>
     *   <div>
     *     <span>2</span>
     *   </div>
     * </div>
     */
    expect(container.children.length).to.equal(1);
    const div1 = container.children[0];
    expect(div1.children.length).to.equal(3);
    const span0 = div1.children[0];
    expect(span0.textContent).to.equal('0');
    const div2 = div1.children[1];
    expect(div2.children.length).to.equal(2);
    const span1 = div2.children[0];
    expect(span1.textContent).to.equal('1');
    const div3 = div2.children[1];
    expect(div3.children.length).to.equal(1);
    const span2 = div3.children[0];
    expect(span2.textContent).to.equal('3');
    const div4 = div1.children[2];
    expect(div4.children.length).to.equal(1);
    const span3 = div4.children[0];
    expect(span3.textContent).to.equal('2');
  });

  it('should work with parent-child relationship', async () => {
    const toggle = ref(true);
    const templateA = html`<span>Template A</span>`;
    const templateB = html`<p>${templateA}</p>`;
    const template = html`<div>${() => toggle.value ? templateB : ''}</div>`;

    // before mounting
    expect(templateA.isInUse).to.be.false;
    expect(templateB.isInUse).to.be.false;
    expect(templateB.children.size).to.equal(0);
    expect(template.isInUse).to.be.false;
    expect(template.children.size).to.equal(0);

    template.mountTo(document.createElement('div'));
    // after mounting
    expect(templateA.isInUse).to.be.true;
    expect(templateB.isInUse).to.be.true;
    expect(templateB.children.size).to.equal(1);
    expect(templateB.children.has(templateA)).to.be.true;
    expect(template.isInUse).to.be.true;
    expect(template.children.size).to.equal(1);
    expect(template.children.has(templateB)).to.be.true;

    toggle.value = false;
    await nextTick();
    // TemplateB and TemplateA should be unmounted
    expect(templateA.isInUse).to.be.false;
    expect(templateB.isInUse).to.be.false;
    expect(templateB.children.size).to.equal(0);
    expect(template.isInUse).to.be.true;
    expect(template.children.size).to.equal(0);

    toggle.value = true;
    await nextTick();
    // TemplateB and TemplateA should be mounted again
    expect(templateA.isInUse).to.be.true;
    expect(templateB.isInUse).to.be.true;
    expect(templateB.children.size).to.equal(1);
    expect(templateB.children.has(templateA)).to.be.true;
    expect(template.isInUse).to.be.true;
    expect(template.children.size).to.equal(1);
    expect(template.children.has(templateB)).to.be.true;
  });

  it('Watch callback is executed after the DOM is updated', async () => {
    const counter = ref(0);
    const template = html`<div>${() => counter.value}</div>`;
    const container = document.createElement('div');
    template.mountTo(container);

    const cb = fake();
    watch(() => counter.value, async () => {
      expect(container.querySelector('div')!.textContent).to.equal('100');
      cb();
    });

    counter.value = 100;
    await nextTick();
    expect(cb.callCount).to.equal(1);
  });

  it('render a computed value', async () => {
    const counter = ref(0);
    const double = computed(() => counter.value * 2);
    const triple = computed(() => double.value * 3);
    const template = html`<div>${() => triple.value}</div>`;

    const container = document.createElement('div');
    template.mountTo(container);
    expect(container.querySelector('div')!.textContent).to.equal('0');

    counter.value = 1;
    await nextTick();
    expect(container.querySelector('div')!.textContent).to.equal('6');
  });
});
