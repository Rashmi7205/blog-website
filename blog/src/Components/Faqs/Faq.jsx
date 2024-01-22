
function Faq({faqData}) {
  return (
    <details
    class="group border-s-4 border-green-500 bg-gray-50 md:p-6 p-2 text-sm [&_summary::-webkit-details-marker]:hidden"
    data-aos="fade-right"
    data-aos-duration="2000"
  >
    <summary class="flex cursor-pointer items-center justify-between gap-1.5">
      <h2 class="text-sm md:text-lg font-medium text-gray-900">
       {faqData?.question}
      </h2>

      <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-45"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </summary>

    <p class="mt-4 leading-relaxed text-gray-700">
        {faqData?.answer}
    </p>
  </details>
  )
}

export default Faq