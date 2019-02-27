<template>
  <div class="MyGrid">
    <table>
      <thead>
        <tr>
          <th v-bind:key="key" v-for="key in columns">
            {{key}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data">
          <td v-for="(value, key, index) in entry">
            {{value}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyGrid',
  props: ['columns', 'data']
}
</script>
